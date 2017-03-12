all:
	@echo "Doing all"

deploy:
	@echo "Pushing to production"
	@git push git@api.pdflegal.com.ar:~/pdflegal master

update:
	@echo "Makefile: Doing UPDATE stuff like grunt, gulp, rake,..."
	@npm install
	@pm2 gracefulReload all
	@whoami
	@pwd
