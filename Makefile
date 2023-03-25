color=$(shell echo "\033[0;32m")
reset=$(shell echo "\033[0m")

HAS_LINKS = $(shell find node_modules -maxdepth 1 -lname '*')

TAG = $(shell grep version package.json | sed -E 's/.*"version":\s+"([^"]+)".*/\1/')
ifndef TAG
$(error Pas de version dans le package.json, il en faut impérativement une)
endif

DOCKER_REGISTRY = eu.gcr.io/divine-arcade-94510
PROJECT = $(shell grep name package.json | sed -E 's/.*"name":\s+"([^"]+)".*/\1/')
DOCKER_PROJECT = $(DOCKER_REGISTRY)/$(PROJECT):$(TAG)
DOCKER_PROJECT_NODE = $(DOCKER_REGISTRY)/$(PROJECT)-node:$(TAG)
export PATH := node_modules/.bin:$(PATH)

CLIENT_DIST = __dist__/client
CLIENT_SRC = src/index.tsx

FLAGS = --bundle --platform=browser --target=es2017 --define:process.env.NODE_ENV=\"production\" --tsconfig=./tsconfig.json --jsx-factory=E --jsx-fragment=E.Fragment

.PHONY: ensure_no_links all clean appjs appjsminified image upload appjswatch staticassets scripts image-node image-goserver version

# Par défaut, on construit le code de débug
all: ensure_no_links appjsminified version
	echo $(DOCKER_PROJECT)

ensure_no_links:
ifneq ($(HAS_LINKS),"")
	echo "pas de liens"
else
	echo "il y a des liens dans le node_modules"
	exit 1
endif

# Nuke du __dist, on repart de zéro.
clean:
	rm -rf $(CLIENT_DIST)/*

$(CLIENT_DIST):
	mkdir -p $(CLIENT_DIST)

node_modules/@grapecity/wijmo/haha:
	# haha
	# node -e 'var fs = require("fs"); for (let file of fs.readdirSync("node_modules/@grapecity/wijmo").filter(f => f.match(/.js$$/))) { fs.writeFileSync("node_modules/@grapecity/wijmo/" + file, fs.readFileSync("node_modules/@grapecity/wijmo/" + file, "utf-8").replace(/function _checkLicense[^}]*}/, "function _checkLicense(){}") ) }'
	# touch node_modules/@grapecity/wijmo/haha


# Pour un build de dev
appjs: staticassets node_modules/@grapecity/wijmo/haha
	esbuild $(FLAGS) --sourcemap --outdir=$(CLIENT_DIST) app=$(CLIENT_SRC)
	echo app.js rebuilt.

version:
	sed -i "s/%%VERSION%%/$(shell grep version package.json | sed -E 's/.*"version":\s+"([^"]+)".*/\1/')-$(shell printf "%d" `date +%s`)/g" $(CLIENT_DIST)/app.js

# Pour le build docker
appjsminified: staticassets node_modules/@grapecity/wijmo/haha
	rm -f $(CLIENT_DIST)/app.js.map
	esbuild $(FLAGS) --minify --outdir=$(CLIENT_DIST) app=$(CLIENT_SRC)
	echo //!v$(TAG) >> $(CLIENT_DIST)/app.js

image-goserver: appjsminified
	docker build --no-cache --rm -t "$(DOCKER_PROJECT)" -f "Dockerfile.goserver" .

image: appjsminified ensure_no_links image-goserver

upload: image
	echo "Type enter to automatically upload this image to"
	echo "$(color)$(DOCKER_PROJECT)$(reset)"
	read FAKE
	#gcloud docker -a
	docker push "$(DOCKER_PROJECT)"


reload:
	docker-compose exec web killall entr
	docker-compose exec web killall postgrest

appjswatch:
	tsc --noEmit -w | wtsc make appjs version

staticassets: $(CLIENT_DIST)
	pwd
	cp -f static/* $(CLIENT_DIST)
	mkdir -p $(CLIENT_DIST)/css
	mkdir -p $(CLIENT_DIST)/webfonts

pgts:
	pgts postgres://app:app@$(shell basename `pwd`)_postgres_1.docker/app src/client/pgts/db.ts api
