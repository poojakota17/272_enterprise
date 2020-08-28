1. Create a session on cisco.dcloud
2. Enable VPN (CiscoAnyConnect)
3. Connect to Ubuntu server (ssh cisco@198.18.134.28)
4. Install ansible
5. generate ssh-keygen
6. hosts file (/etc/ansible/hosts)
7. variable file(/etc/ansible/group_vars/apache)
...


hosts file:\
[apache]\
centos1 ansible_ssh_user=root\
centos2 ansible_ssh_user=root\

variable file:\
/---
centos1: 198.18.134.49\
centos2: 198.18.134.50\
