import mysql.connector as msc
from mysql.connector import errorcode
import logging
import time

def logger(name: str):
    # Set up logger
    logger = logging.getLogger(__name__)
    logger.setLevel(logging.INFO)
    formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")

    # Log to console
    handler = logging.StreamHandler()
    handler.setFormatter(formatter)
    logger.addHandler(handler)

    # Also log to a file
    file_handler = logging.FileHandler("./database/cpy-errors.log")
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler) 

    return logger

# return Connection to sql server
def connect(config: dict[str, str], logger, attempts=3, delay=2):
    attempt = 1
    # Implement a reconnection routine
    while attempt < attempts + 1:
        try:
            return msc.connect(**config)
        except (msc.Error, IOError) as err:
            if (attempts is attempt):
                # Attempts to reconnect failed; returning None
                logger.info("Failed to connect, exiting without a connection: %s", err)
                return None
            logger.info(
                "Connection failed: %s. Retrying (%d/%d)...",
                err,
                attempt,
                attempts-1,
            )
            # progressive reconnect delay
            time.sleep(delay ** attempt)
            attempt += 1
    return None