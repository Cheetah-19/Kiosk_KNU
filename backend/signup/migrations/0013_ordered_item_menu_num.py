# Generated by Django 4.2.5 on 2023-11-15 16:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("signup", "0012_ordered_item_option_num"),
    ]

    operations = [
        migrations.AddField(
            model_name="ordered_item",
            name="menu_num",
            field=models.IntegerField(null=True),
        ),
    ]