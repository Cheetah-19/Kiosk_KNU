from django.shortcuts import render
from . import views
# Create your views here.



def test(request):
    return render(request,'test1.html',context={})
