1. Create a session on cisco.dcloud
2. Enable VPN (CiscoAnyConnect)
3. Connect to Ubuntu server (`ssh cisco@198.18.134.28`)
4. Install ansible if it wasn't installed (check with `ansible -v`)
  * install the necessary repository `sudo apt-add-repository ppa:ansible/ansible`;
  * update apt with the command `sudo apt-get update`;
  * install Ansible with the command `sudo apt-get install ansible -y`.
5. Generate public key: `ssh-keygen` and copy it(`cat ~/.ssh/id_rsa.pub`);
6. Add ssh-key to remote host. Choose one of the following: 
  * Log into Centos1 (`ssh root@198.18.134.49`) and add key to authorized_keys file `sudo nano ~/.ssh/authorized_keys` (to save in nano use ctrl + X, then Y and Enter)
  * Or from ansible server run this command: `ssh-copy-id root@198.18.134.49`
7. Repeat step 6 for Centos2
8. Reconnect to ubuntu server and update hosts file `sudo nano /etc/ansible/hosts`
9. Check Ansible connection with ping `ansible apache -m ping`

> in progress
> 10. Create file for storing variables with the name of the group: `sudo nano /etc/ansible/group_vars/apache`

11. Create simple playbook apache.yml (the name of the hosts name) `sudo nano /etc/ansible/apache.yml`
12. Run the playbook `ansible-playbook apache.yml`



hosts file:
```
[apache]
198.18.134.49 ansible_ssh_user=root
198.18.134.50 ansible_ssh_user=root
```

playbook  yml file:
```
---
- hosts: apache
  tasks:
    - name: run echo command
      command: /bin/echo hello k!
```

variable file:\
---\
centos1: 198.18.134.49\
centos2: 198.18.134.50


### Sources:
[Install Ansible on Ubuntu](https://www.techrepublic.com/article/how-to-install-ansible-on-ubuntu-server-18-04/)\
[Install Apache Server](https://www.bogotobogo.com/DevOps/Ansible/Ansible_SettingUp_Webservers_Apache.php)\
[Install Apache on Centos](https://www.vultr.com/docs/how-to-install-apache-on-centos-7/?gclid=Cj0KCQjw1qL6BRCmARIsADV9JtYvUn_K0HSbl7wtMxWJQUtZct7il6qXKgVEWapXC6VZrvgXqBEdmR8aAjCXEALw_wcB)
