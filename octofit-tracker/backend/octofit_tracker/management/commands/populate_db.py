from django.core.management.base import BaseCommand
from django.contrib.auth.hashers import make_password
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import date


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create users (superheroes)
        users = [
            User(username='ironman', email='ironman@avengers.com', password=make_password('password123')),
            User(username='spiderman', email='spiderman@avengers.com', password=make_password('password123')),
            User(username='thor', email='thor@avengers.com', password=make_password('password123')),
            User(username='batman', email='batman@dc.com', password=make_password('password123')),
            User(username='superman', email='superman@dc.com', password=make_password('password123')),
            User(username='wonderwoman', email='wonderwoman@dc.com', password=make_password('password123')),
        ]
        for user in users:
            user.save()
        self.stdout.write(self.style.SUCCESS(f'Created {len(users)} users'))

        # Create teams
        team_marvel = Team(name='Team Marvel', members=['ironman', 'spiderman', 'thor'])
        team_dc = Team(name='Team DC', members=['batman', 'superman', 'wonderwoman'])
        team_marvel.save()
        team_dc.save()
        self.stdout.write(self.style.SUCCESS('Created 2 teams'))

        # Create activities
        activities = [
            Activity(username='ironman', activity_type='running', duration=30.0, date=date(2024, 1, 15)),
            Activity(username='spiderman', activity_type='strength training', duration=45.0, date=date(2024, 1, 15)),
            Activity(username='thor', activity_type='walking', duration=60.0, date=date(2024, 1, 16)),
            Activity(username='batman', activity_type='running', duration=50.0, date=date(2024, 1, 16)),
            Activity(username='superman', activity_type='strength training', duration=40.0, date=date(2024, 1, 17)),
            Activity(username='wonderwoman', activity_type='walking', duration=35.0, date=date(2024, 1, 17)),
        ]
        for activity in activities:
            activity.save()
        self.stdout.write(self.style.SUCCESS(f'Created {len(activities)} activities'))

        # Create leaderboard
        leaderboard_entries = [
            Leaderboard(username='thor', score=300),
            Leaderboard(username='batman', score=250),
            Leaderboard(username='superman', score=200),
            Leaderboard(username='ironman', score=150),
            Leaderboard(username='wonderwoman', score=175),
            Leaderboard(username='spiderman', score=225),
        ]
        for entry in leaderboard_entries:
            entry.save()
        self.stdout.write(self.style.SUCCESS(f'Created {len(leaderboard_entries)} leaderboard entries'))

        # Create workouts
        workouts = [
            Workout(name='Hero Cardio', description='High intensity cardio workout for superheroes', duration=30, intensity='high'),
            Workout(name='Super Strength', description='Build superhero strength with this workout', duration=45, intensity='high'),
            Workout(name='Agility Training', description='Improve your agility like Spider-Man', duration=40, intensity='medium'),
            Workout(name='Recovery Walk', description='Light walking for recovery days', duration=60, intensity='low'),
            Workout(name='Battle Prep', description='Full body workout to prepare for battle', duration=60, intensity='high'),
        ]
        for workout in workouts:
            workout.save()
        self.stdout.write(self.style.SUCCESS(f'Created {len(workouts)} workouts'))

        self.stdout.write(self.style.SUCCESS('Database populated successfully!'))
