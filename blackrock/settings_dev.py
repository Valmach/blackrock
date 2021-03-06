# flake8: noqa
from blackrock.settings_shared import *

DATABASE_ENGINE = 'postgresql_psycopg2'


TEMPLATE_DIRS = (
    "/var/www/blackrock/blackrock/blackrock/templates",
)

MEDIA_ROOT = '/var/www/blackrock/uploads/'

# put any static media here to override app served static media
STATICMEDIA_MOUNTS = (
    ('/sitemedia', '/var/www/blackrock/blackrock/sitemedia'),
)


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'blackrock',
        'HOST': '',
        'PORT': '',  # see /etc/pgbouncer/pgbouncer.ini
        'USER': '',
        'PASSWORD': '',
    }
}

DEBUG = False
TEMPLATE_DEBUG = DEBUG
DEV_ENV = True
STATSD_PREFIX = 'blackrock-dev'
SENTRY_SITE = 'blackrock-dev'
SENTRY_SERVERS = ['http://sentry.ccnmtl.columbia.edu/sentry/store/']

if 'migrate' not in sys.argv:
    INSTALLED_APPS.append('raven.contrib.django')

    import logging
    from raven.contrib.django.handlers import SentryHandler
    logger = logging.getLogger()
    # ensure we havent already registered the handler
    if SentryHandler not in list(map(type, logger.handlers)):
        logger.addHandler(SentryHandler())
        logger = logging.getLogger('sentry.errors')
        logger.propagate = False
        logger.addHandler(logging.StreamHandler())

try:
    from blackrock.local_settings import *
except ImportError:
    pass
