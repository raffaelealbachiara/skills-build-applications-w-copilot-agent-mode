from rest_framework import serializers
from .models import Team, UserProfile, Activity, Workout, Leaderboard
from django.contrib.auth.models import User

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    team = TeamSerializer(read_only=True)
    class Meta:
        model = UserProfile
        fields = '__all__'

class ActivitySerializer(serializers.ModelSerializer):
    user = UserProfileSerializer(read_only=True)
    class Meta:
        model = Activity
        fields = '__all__'

class WorkoutSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer(read_only=True)
    class Meta:
        model = Workout
        fields = '__all__'

class LeaderboardSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer(read_only=True)
    team = TeamSerializer(read_only=True)
    class Meta:
        model = Leaderboard
        fields = '__all__'
