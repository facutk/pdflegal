all:
	@echo "Doing all"

deploy:
	@echo "Pushing to production"
	@git push git@api.pdflegal.com.ar:~/pdflegal master

update:
	@whoami
	@pwd
	@echo "Makefile: Doing UPDATE stuff like grunt, gulp, rake,..."
	@npm install
	@echo "pm2 reloading services"
	@sudo ./etc/init.d/pm2-facutk restart
