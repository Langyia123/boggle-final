from django.urls import path
from .views import *

urlpatterns = [
  path("game/<int:size>/", CreateGameBySizeView.as_view()),
  path("games/", GameListView.as_view()),
  path("games/<uuid:id>/", GameDetailView.as_view()),
  path("games/<uuid:id>/leaderboard/", GameLeaderBoardView.as_view()),
]