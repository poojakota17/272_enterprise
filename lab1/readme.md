1. Create a session on cisco.dcloud
2. Enable VPN (CiscoAnyConnect)
3. Connect to Ubuntu server (`ssh cisco@198.18.134.28`)
4. Install ansible on Server machine if it wasn't installed (check with `ansible --version` or `ansible localhost -m ping`)
  * `sudo apt-get install python-yaml python-jinja2 python-paramiko python-crypto python-keyczar ansible`
  > install on Client machines `sudo apt-get install python-crypto python-keyczar` ?
5. Generate public key: `ssh-keygen` and copy it(`cat ~/.ssh/id_rsa.pub`);
6. Add ssh-key to remote host. Choose one of the following: 
  * Log into Centos1 (`ssh root@198.18.134.49`) and add key to authorized_keys file `sudo nano ~/.ssh/authorized_keys` (to save in nano use ctrl + X, then Y and Enter)
  * Or from ansible server run this command: `ssh-copy-id root@198.18.134.49`
7. Repeat step 6 for Centos2
8. On Server machine (Ubunty in our case) check path to the hosts file in **ansible.cfg** `sudo nano /etc/ansible/ansible.cfg`\
  Should have this line:
   ```
   [defaults]
   hostfile = /etc/ansible/hosts
   ```
9. Update **hosts** file `sudo nano /etc/ansible/hosts`\
   By default hosts and config files are in home directory /etc/ansible but could be changed to any other working directory.\
   In this case in the working directory 2 files should be created: **hosts** and **ansible.cfg** with: 
    ```
   [defaults]
    hostfile = hosts
    ```
10. Check Ansible connection with ping `ansible apache -m ping`/ `ansible all -m ping -u root`

> optional (as of now varialbes are set in the inventory)
> 10. Create file for storing variables with the name of the group: `sudo nano /etc/ansible/group_vars/apache`

11. Create simple playbook apache.yml (the name of the hosts name) `sudo nano /etc/ansible/apache.yml`
12. Run the playbook `ansible-playbook /etc/ansible/apache.yml`



hosts file:
```
[apache]
Centos1 ansible_host=198.18.134.49 ansible_ssh_user=root
Centos2 ansible_host=198.18.134.50 ansible_ssh_user=root
```

playbook  yml file:
```
---
- hosts: apache
  tasks:
    - name: run echo command
      command: /bin/echo hello k!
```


### Sources:
[Install Ansible on Ubuntu](https://www.techrepublic.com/article/how-to-install-ansible-on-ubuntu-server-18-04/)\
[Install Apache Server](https://www.bogotobogo.com/DevOps/Ansible/Ansible_SettingUp_Webservers_Apache.php)\
[Install Apache on Centos](https://www.vultr.com/docs/how-to-install-apache-on-centos-7/?gclid=Cj0KCQjw1qL6BRCmARIsADV9JtYvUn_K0HSbl7wtMxWJQUtZct7il6qXKgVEWapXC6VZrvgXqBEdmR8aAjCXEALw_wcB)\
[Install Apache on Ansible](https://www.scaleway.com/en/docs/how-to-install-apache-on-ansible/)
[Ansible Documentation](https://docs.ansible.com/ansible/latest/index.html)
