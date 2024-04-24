#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lakshya.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    
    # Check if the command is 'runserver' and run it with the default port (8000) if no other command is specified
    if len(sys.argv) == 1 or sys.argv[1] == 'runserver':
        sys.argv = [sys.argv[0], 'runserver', '0.0.0.0:8000']
    
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
