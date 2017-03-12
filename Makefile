all:
	@echo "Doing all"

deploy:
	@echo "Pushing to production"
	@git push git@api.pdflegal.com.ar:~/pdflegal master

update:
	@echo "Makefile: Doing UPDATE stuff like grunt, gulp, rake,..."
	@npm install
	@echo "pm2 reloading services"
	@pm2 gracefulReload all
	@whoami
	@pwd
