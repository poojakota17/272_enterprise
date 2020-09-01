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
8. On Server machine (Ubunty in our case) create a new working directory `ansible`
  ```
  $ mkdir ansible
  $ cd ansible_host
  ```
9. Create **ansible.cfg** and **hosts** files(see below) \
   By default hosts and config files are in the home directory `/etc/ansible` so **ansible.cfg** and **hosts** could be updated there.
10. Check Ansible connection with ping `$ ansible apache -m ping -u root`\
    or run a simple command `$ ansible apache -m command -a "/bin/echo hello"`
> optional (as of now varialbes are set in the inventory)
> 10. Create file for storing variables with the name of the group: `$ sudo nano /etc/ansible/group_vars/apache`
11. Create playbook **apache.yml** (the name of the hosts group) `$ sudo nano apache.yml` (see below)
12. To deploy servers run the playbook `$ ansible-playbook apache.yml --skip-tags "undeploy"`
13. Check result with `$ curl 198.18.134.49` and  `$ curl 198.18.134.50`
14. To undeploy servers run `$ ansible-playbook apache.yml --tags "undeploy"`

**ansible.cfg** file:
```
[defaults]
hostfile = hosts
```

**hosts** file:
```
[apache]
centos1 ansible_host=198.18.134.49
centos2 ansible_host=198.18.134.50
```

**apache.yml** file:
```
---
- name: Setup httpd webserver
  hosts: apache
  sudo: yes
  remote_user: root
  vars:
    homepage: 'Hello World from {{ inventory_hostname }}'
  tasks:
    - name: install apache packages
      yum:
       name: httpd
       state: present
    - name: ensure apache is at the latest version
      yum:
      name: httpd
      state: latest
    - name: ensure httpd is running
      service:
       name: httpd
       state: started
    - name: open port 80 for http access
      firewalld:
       service: http
       permanent: true
       state: enabled
    - name: restart the firewalld service to load in the firewall changes
      service:
       name: firewalld
       state: restarted
    - name: create index.html
      copy:
       dest: "/var/www/html/index.html"
       content: '{{ homepage }}'
    - name: stop server
      yum:
       name: httpd
       state: removed
      tags:
       - undeploy

  handlers:
    - name: restart apache
      service:
        name: httpd
        state: restarted
```
### Sources:
[Install Ansible on Ubuntu](https://www.techrepublic.com/article/how-to-install-ansible-on-ubuntu-server-18-04/)\
[Install Apache Server](https://www.bogotobogo.com/DevOps/Ansible/Ansible_SettingUp_Webservers_Apache.php)\
[Install Apache on Centos](https://codingbee.net/ansible/ansible-a-playbook-for-setting-up-an-apache-webserver)\
[Install Apache on Ansible](https://www.scaleway.com/en/docs/how-to-install-apache-on-ansible/)
[Ansible Documentation](https://docs.ansible.com/ansible/latest/index.html)
[How to Create Ansible Plays and Playbooks](https://www.tecmint.com/create-ansible-plays-and-playbooks/)
