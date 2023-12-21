from signup.models import User
from .serializers import UserSerializer
from face_recognition.checker import isFace
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response


    
class UserPost(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class FaceCheckView(APIView):
    def post(self, request):
        face_base = request.data.get('imageData')

        # 얼굴 추출 됨
        if isFace(face_base):
            print("No mask")
            return Response({'result': True})
        # 얼굴 추출 안됨
        else:
            print("mask")
            return Response({'result': False}, status=400)