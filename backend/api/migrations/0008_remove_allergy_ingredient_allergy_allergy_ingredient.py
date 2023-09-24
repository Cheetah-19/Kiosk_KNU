# Generated by Django 4.2.5 on 2023-09-17 11:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0007_alter_user_region"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="allergy",
            name="ingredient",
        ),
        migrations.AddField(
            model_name="allergy",
            name="allergy_ingredient",
            field=models.ManyToManyField(to="api.ingredient"),
        ),
    ]