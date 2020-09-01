1. Create a session on cisco.dcloud
2. Enable VPN (CiscoAnyConnect)
3. Connect to Ubuntu server (`$ ssh cisco@198.18.134.28`)
4. Install ansible on Server machine if it wasn't installed (check with `$ ansible --version` or `$ ansible localhost -m ping`)
  ```$ sudo apt-get update
     $ sudo apt-get install software-properties-common
     $ sudo apt-add-repository ppa:ansible/ansible
     $ sudo apt-get update
     $ sudo apt-get install ansible
  ```
  > install on Client machines `$ sudo apt-get install python-crypto python-keyczar` ?
5. Generate public key: `$ ssh-keygen` and copy it(`$ cat ~/.ssh/id_rsa.pub`);
6. Add ssh-key to remote host. Choose one of the following: 
  * From ansible server run this command: `$ ssh-copy-id root@198.18.134.49`
  * Or log into Centos1 (`$ ssh root@198.18.134.49`) and add key to authorized_keys file `$ sudo nano ~/.ssh/authorized_keys` (to save in nano use ctrl + X, then Y and Enter)
7. Repeat step 6 for Centos2
8. On Server machine (Ubunty in our case) in the working directory create file in **ansible.cfg** (see below)
9. Create file **hosts** (see below)\
   By default hosts and config files are in the home directory `/etc/ansible` so **ansible.cfg** and **hosts** could be updated there.
10. Check Ansible connection with ping `$ ansible apache -m ping`/ `$ ansible all -m ping -u root`\
    or run a simple command `$ ansible apache -m command -a "/bin/echo hello"`
> optional (as of now varialbes are set in the inventory)
> 10. Create file for storing variables with the name of the group: `$ sudo nano /etc/ansible/group_vars/apache`
11. Create simple playbook **apache.yml** (the name of the hosts group) `$ sudo nano apache.yml` (see below)
12. Run the playbook `$ ansible-playbook /etc/ansible/apache.yml`

**ansible.cfg** file:
```
[defaults]
hostfile = hosts
```

**hosts** file:
```
[apache]
Centos1 ansible_host=198.18.134.49 ansible_ssh_user=root
Centos2 ansible_host=198.18.134.50 ansible_ssh_user=root
```

**apache.yml** file:
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
