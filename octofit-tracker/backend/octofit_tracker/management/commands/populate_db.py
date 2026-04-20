from django.core.management.base import BaseCommand
from octofit_tracker.models import Team, UserProfile, Activity, Workout, Leaderboard
from django.contrib.auth.models import User
from datetime import datetime, timedelta
import random


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        self.stdout.write('Starting database population...')

        # Clear existing data
        self.stdout.write('Clearing existing data...')
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        UserProfile.objects.all().delete()
        Team.objects.all().delete()
        User.objects.filter(username__in=[u.username for u in User.objects.all()]).delete()

        # Create Teams
        self.stdout.write('Creating teams...')
        team_marvel = Team.objects.create(
            name='Team Marvel',
            description='The Marvel Superheroes team'
        )
        team_dc = Team.objects.create(
            name='Team DC',
            description='The DC Superheroes team'
        )

        # Superhero data
        marvel_heroes = [
            {'first_name': 'Tony', 'last_name': 'Stark', 'email': 'iron.man@marvel.com'},
            {'first_name': 'Steve', 'last_name': 'Rogers', 'email': 'captain.america@marvel.com'},
            {'first_name': 'Bruce', 'last_name': 'Banner', 'email': 'hulk@marvel.com'},
            {'first_name': 'Natasha', 'last_name': 'Romanoff', 'email': 'black.widow@marvel.com'},
            {'first_name': 'Clint', 'last_name': 'Barton', 'email': 'hawkeye@marvel.com'},
        ]

        dc_heroes = [
            {'first_name': 'Bruce', 'last_name': 'Wayne', 'email': 'batman@dc.com'},
            {'first_name': 'Clark', 'last_name': 'Kent', 'email': 'superman@dc.com'},
            {'first_name': 'Diana', 'last_name': 'Prince', 'email': 'wonder.woman@dc.com'},
            {'first_name': 'Barry', 'last_name': 'Allen', 'email': 'flash@dc.com'},
            {'first_name': 'Victor', 'last_name': 'Stone', 'email': 'cyborg@dc.com'},
        ]

        # Create Users for Marvel Team
        self.stdout.write('Creating Marvel team users...')
        marvel_users = []
        for hero in marvel_heroes:
            user = User.objects.create_user(
                username=hero['email'].split('@')[0],
                email=hero['email'],
                first_name=hero['first_name'],
                last_name=hero['last_name']
            )
            user_profile = UserProfile.objects.create(
                user=user,
                email=hero['email'],
                first_name=hero['first_name'],
                last_name=hero['last_name'],
                team=team_marvel,
                total_points=random.randint(500, 2000)
            )
            marvel_users.append(user_profile)

        # Create Users for DC Team
        self.stdout.write('Creating DC team users...')
        dc_users = []
        for hero in dc_heroes:
            user = User.objects.create_user(
                username=hero['email'].split('@')[0],
                email=hero['email'],
                first_name=hero['first_name'],
                last_name=hero['last_name']
            )
            user_profile = UserProfile.objects.create(
                user=user,
                email=hero['email'],
                first_name=hero['first_name'],
                last_name=hero['last_name'],
                team=team_dc,
                total_points=random.randint(500, 2000)
            )
            dc_users.append(user_profile)

        all_users = marvel_users + dc_users

        # Create Activities
        self.stdout.write('Creating activities...')
        activity_types = ['running', 'walking', 'strength', 'cycling', 'swimming']
        for user in all_users:
            for _ in range(random.randint(3, 8)):
                activity_type = random.choice(activity_types)
                duration = random.randint(15, 120)
                distance = random.uniform(1, 20)
                calories = random.randint(100, 600)
                points = duration // 5  # 5 minutes = 1 point

                Activity.objects.create(
                    user=user,
                    activity_type=activity_type,
                    duration_minutes=duration,
                    distance_km=round(distance, 2),
                    calories_burned=calories,
                    points_earned=points,
                    date=datetime.now() - timedelta(days=random.randint(0, 30))
                )

        # Create Workouts
        self.stdout.write('Creating workouts...')
        workout_templates = [
            {
                'name': 'Morning Run',
                'description': 'A morning jogging session for cardio',
                'exercises': ['5 min warm-up', '20 min running', '5 min cool-down'],
                'difficulty': 'easy'
            },
            {
                'name': 'Strength Training',
                'description': 'Upper body strength training',
                'exercises': ['10 pushups', '10 pullups', '20 squats'],
                'difficulty': 'hard'
            },
            {
                'name': 'Yoga Session',
                'description': 'Relaxing yoga workout',
                'exercises': ['Downward dog', 'Warrior pose', 'Child pose'],
                'difficulty': 'easy'
            },
            {
                'name': 'HIIT Training',
                'description': 'High Intensity Interval Training',
                'exercises': ['Burpees', 'Jump squats', 'Mountain climbers'],
                'difficulty': 'hard'
            },
        ]

        for user in all_users:
            workout = Workout.objects.create(
                user=user,
                name=random.choice(workout_templates)['name'],
                description=random.choice(workout_templates)['description'],
                exercises=random.choice(workout_templates)['exercises'],
                difficulty_level=random.choice(['easy', 'medium', 'hard'])
            )

        # Create Leaderboard
        self.stdout.write('Creating leaderboard...')
        ranked_users = sorted(all_users, key=lambda x: x.total_points, reverse=True)
        for rank, user in enumerate(ranked_users, 1):
            activities_count = Activity.objects.filter(user=user).count()
            Leaderboard.objects.create(
                user=user,
                team=user.team,
                rank=rank,
                total_points=user.total_points,
                activities_count=activities_count
            )

        self.stdout.write(self.style.SUCCESS('Database population completed successfully!'))
        self.stdout.write(f'Created {len(all_users)} users')
        self.stdout.write(f'Created {Activity.objects.count()} activities')
        self.stdout.write(f'Created {Workout.objects.count()} workouts')
        self.stdout.write(f'Created {Leaderboard.objects.count()} leaderboard entries')
