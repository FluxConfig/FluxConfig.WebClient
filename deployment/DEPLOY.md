# FluxConfig.WebClient deployment guidance

## Getting started

### 0. Prerequisites

**Docker and docker-compose installed on the system.**

### 1. Download deployment script

```bash
curl -LJO https://raw.githubusercontent.com/FluxConfig/FluxConfig.WebClient/refs/heads/master/deployment/boot_client.sh
```

### 2. Fill .cfg file as it shown in [template](https://github.com/FluxConfig/FluxConfig.WebClient/blob/master/deployment/webclient.template.cfg)

**You can create and fill it manually**

**Download and fill it manually**

```bash
curl -LJO https://raw.githubusercontent.com/FluxConfig/FluxConfig.WebClient/refs/heads/master/deployment/webclient.template.cfg
```

**Or let the script download it.**

```bash
./boot_client.sh -c "non-existing.cfg"
Fetching docker-compose.yml...
docker-compose.yml successfully downloaded

Config file not found. Do you want to download template file? y/n
y

Fetching webclient.template.cfg...
webclient.template.cfg successfully downloaded

Please fill the configuration file and run this script again.
```

### 2.1 .cfg arguments

| **Argument**            | **Description**                                                                                                                                                                                                                                                                 | **Example**                      |
|-------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------|
| **FC_TAG**              | Tag/version of the FluxConfig.WebClient image which will be used. <br> You can find all tags [here](https://hub.docker.com/r/fluxconfig/fluxconfig.webclient/tags)                                                                                                              | 1.0-pre                          |
| **FC_CLIENT_PORT** | Port for client, which will be exposed from container                                                                                                                                                                                                                           | Any free port, e.g 3000          |
| **FCM_BASE_URL**       | Address of FluxConfig.Management service                                                                                                                                                                                                                                        | http://fcmanagement:8080         |
| **FC_API_KEY**          | Internal api-key for interservice communication. <br> If you don't have one, leave this argument empty and it will be generated for you. <br> Remember it for deployment the rest of the FluxConfig system. <br> If you already have one from other deployments - fill argument | e72eb4601d5a45bd9d5fd8b439b9097f |

### 3. Execute deployment script

**Give executable permissions to the file**

```bash
chmod +x boot_client.sh
```

**Deploy**

```bash
./boot_client.sh -c "PATH TO YOUR .cfg FILE"
```

**Example of output for successful deployment**

```bash
Fetching docker-compose.yml...
docker-compose.yml successfully downloaded

Reading .cfg file...
Loaded: FC_TAG=1.0-pre
Loaded: FC_CLIENT_PORT=3000
Loaded: FCM_BASE_URL=http://localhost:7070

Generating value for FC_API_KEY
Loaded: FC_API_KEY=dc0772d453f54cbf8a4c158557f8a008

Starting FluxConfig WebClient...
[+] Running 1/1
 ✔ web-client Pulled 
[+] Running 2/2
 ✔ Network deployment_default  Created 
 ✔ Container fc-webclient      Started 
```