from django.urls import path

from task.views import TaskTemplateView, TaskListView, TaskView


urlpatterns = [
    path('', TaskTemplateView.as_view(), name='task_template_view'),
    path('list/', TaskListView.as_view(), name='task_list_view'),
    path('task/', TaskView.as_view(), name='task_view'),
    path('task/<int:task_id>', TaskView.as_view(), name='task_view'),
]
