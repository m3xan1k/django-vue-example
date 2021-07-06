import json

from django.shortcuts import render
from django.views import View
from django.http import JsonResponse, HttpResponse
from django.forms.models import model_to_dict

from task.models import Task


class TaskTemplateView(View):
    def get(self, request):
        return render(request, 'task/tasks.html')


class TaskListView(View):
    def get(self, request):
        tasks = list(Task.objects.values())
        return JsonResponse(data=tasks, safe=False, status=200)


class TaskView(View):

    def post(self, request):
        data = json.loads(request.body.decode('utf-8'))
        task = Task.objects.create(**data)
        return JsonResponse(data=model_to_dict(task), status=200)

    def put(self, request, task_id):
        task = Task.objects.get(pk=task_id)
        task.completed = False if task.completed else True
        task.save()
        return HttpResponse(status=200)

    def delete(self, request, task_id):
        task = Task.objects.get(pk=task_id)
        task.delete()
        return HttpResponse(status=200)
