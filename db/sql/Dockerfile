FROM mysql

# Create a new database
ENV MYSQL_DATABASE=products

# Copy the SQL script to the container
COPY init.sql /docker-entrypoint-initdb.d/