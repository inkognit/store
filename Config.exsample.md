<!--
##for launch.json

{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "dev",
            "console": "integratedTerminal",
            "runtimeExecutable": "npm",
            "preLaunchTask": "Orders",
            "postDebugTask": "Remove Docker Postgres",
            "runtimeArgs": [
                "run",
                "start:dev"
            ],
            "env": {
                "PORT": "your_port",
                "SALT": "your_salt",
                "JWT_SECRET": "some_text",
                "DB_PORT": "your_db_post",
                "DB_HOST": "your_host",
                "DB_USERNAME": "your_db_username",
                "DB_PASSWORD": "your_db_password",
                "DB_NAME": "your_db_name",
            }
        }
    ]
}

##for task.json

{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Orders",
            "dependsOrder": "sequence",
            "dependsOn": [
                "Start Docker Postgres",
                "Sleep for 10 seconds",
                "Build Docker Postgres",
            ]
        },
        {
            "label": "Start Docker Postgres",
            "type": "shell",
            "command": "docker run --name myDataBase -v \"${input:path}\"/://app -p 9876:5432 -e POSTGRES_USER=testadmin -e POSTGRES_PASSWORD=verysecretpassword -e POSTGRES_DB=dockerstoredb -d postgres"
        },
        {
            "label": "Sleep for 10 seconds",
            "type": "shell",
            "command": "ping 127.0.0.1 -n 10"
        },
        {
            "label": "Build Docker Postgres",
            "type": "shell",
            "command": "docker exec myDataBase sh -c 'psql -U testadmin -d dockerstoredb < /app/db.sql'"
        },
        {
            "label": "Remove Docker Postgres",
            "type": "shell",
            "command": "docker container rm -f myDataBase"
        }
    ],
    "inputs": [
        {
            "type": "pickString",
            "id": "path",
            "description": "Path to sql file",
            "options": [
                "D:\\home\\store\\src\\db",
            ],
            "default": "D:\\home\\store\\src\\db"
        }
    ]
}

 -->
