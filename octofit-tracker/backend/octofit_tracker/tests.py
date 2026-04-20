from django.test import TestCase
from .models import Team, UserProfile, Activity, Workout, Leaderboard

class SimpleModelTest(TestCase):
    def test_team_creation(self):
        team = Team.objects.create(name='Test Team', description='A test team')
        self.assertEqual(team.name, 'Test Team')
    def test_userprofile_creation(self):
        team = Team.objects.create(name='Test Team2', description='A test team2')
        user = UserProfile.objects.create(email='test@example.com', first_name='Test', last_name='User', team=team)
        self.assertEqual(user.email, 'test@example.com')
