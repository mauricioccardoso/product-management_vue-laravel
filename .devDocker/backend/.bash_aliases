# Framework - Laravel
alias art='php artisan'
alias dev='php artisan serve --host=0.0.0.0 --port=8080'
alias devserve='php artisan serve'

alias mig='php artisan migrate'
alias migf='php artisan migrate:fresh'          #Drop all tables and migrates again
alias migrf='php artisan migrate:refresh'       #Drop all tables made by migrations and migrates again

alias migr='php artisan migrate:reset'
alias migrb='php artisan migrate:rollback'

alias laravel-install='/usr/local/bin/laravel-install.sh'

# Language - PHP
# The port must be the same as that of the backend service in the docker-compose file
alias devphp='php -S localhost:8080 -t public'

# System
alias ex='exit'
alias cl='clear'
alias l='ls -CF --color=auto'
alias la='ls -la --color=auto'
alias ll='ls -l --color=auto'
alias ls='ls --color=auto'

alias dir='dir --color=auto'

alias grep='grep --color=auto'
alias egrep='egrep --color=auto'
alias fgrep='fgrep --color=auto'