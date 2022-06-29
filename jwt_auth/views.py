from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied, ValidationError
from datetime import datetime, timedelta # create timestamps in different formats
from django.conf import settings
import jwt
from rest_framework.permissions import IsAuthenticated

# Serializer
from .serializers.common import UserSerializer

# Model
from django.contrib.auth import get_user_model
User = get_user_model()


class RegisterView(APIView):

  def post(self, request):
    user_to_add = UserSerializer(data=request.data)
    try:
      user_to_add.is_valid(True)
      print(user_to_add.errors)
      user_to_add.save()
      return Response({ 'message': 'Registration Successful' }, status.HTTP_202_ACCEPTED)
    except ValidationError:
      return Response(user_to_add.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
    except Exception as e:
      print(e)
      return Response({ 'detail': str(e) }, status.HTTP_422_UNPROCESSABLE_ENTITY)


class LoginView(APIView):
  def post(self, request):
    email = request.data.get('email')
    password = request.data.get('password')
    try:
      # similar to pk=pk, here we search for a user by the email field on the model
      # we use the request email as the value, which will return a user record if one exists
      user_to_validate = User.objects.get(email=email)
    except User.DoesNotExist:
      raise PermissionDenied('Invalid credentials')

    # if we get to here, then a user was found in the db matching the email passed
    # we need to check the plain text password against the stored hashed password and we'll use check_password to do it
    if not user_to_validate.check_password(password):
      raise PermissionDenied('Invalid credentials')

    # If we get here, then the user is verified
    # at this point, we want to create a token

    # datetime.now() gives us the timestamp for right now
    # we then add on 3 hours by using timedelta and specifying hours=3
    dt = datetime.now() + timedelta(hours=3)

    # building our token
    token = jwt.encode(
      {
        'sub': user_to_validate.id,
        'exp': int(dt.strftime('%s'))
      },
        settings.SECRET_KEY,
        algorithm='HS256'
    )
    return Response({ 'message': f"Welcome back, {user_to_validate.username}", 'token': token }, status.HTTP_202_ACCEPTED)

class UserView(APIView):
  permission_classes = (IsAuthenticated, )

  def get_user(self, pk, request_user_id):
    try:
      user = User.objects.get(pk = pk)
      if user.id != request_user_id:
        raise PermissionDenied('Permission Denied')
      return user
    except User.DoesNotExist:
      raise PermissionDenied(detail="Invalid Credentials")

  def get(self, request, pk):
    user = self.get_user(pk, request.user.id)
    serialized_user = UserSerializer(user)
    return Response(serialized_user.data, status=status.HTTP_200_OK)

  def put(self, request, pk): 
    user_to_edit = self.get_user(pk = request.user.id)
    deserialized_user= UserSerializer(user_to_edit, data=request.data)
    try:
      deserialized_user.is_valid(True)
      deserialized_user.save()
      return Response(deserialized_user.data, status.HTTP_202_ACCEPTED)
    except Exception as e:
      return Response({ 'error' : str(e) }, status.HTTP_422_UNPROCESSABLE_ENTITY)

  def delete(self, request,pk):
    user_to_delete = self.get_user(pk, request.user.id)
    user_to_delete.delete()
    return Response(status = status.HTTP_204_NO_CONTENT)