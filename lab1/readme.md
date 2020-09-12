[Detailed steps with screenshots: Windows](https://docs.google.com/document/d/1gzLFF5CQZE_CN7a013COxdLcFpPhaNbapD5fobQW1oo/edit?ts=5f4ae8d2)
[Detailed steps with screenshots: Mac](https://docs.google.com/document/d/1sVT_eeQqi7TSR4eoMM_t_cQia1GJryIAMI_kvNu8SQ8/edit?usp=sharing)
1. Create a session at [cisco.dcloud](https://dcloud2-sjc.cisco.com/)
2. Enable VPN (CiscoAnyConnect)
3. Connect to Ubuntu server (`$ ssh cisco@198.18.134.28`)
4. Install ansible on Server machine if it wasn't installed (check with `$ ansible --version` or `$ ansible localhost -m ping`)
  ```$ sudo apt-get update
     $ sudo apt-get install software-properties-common
     $ sudo apt-add-repository ppa:ansible/ansible
     $ sudo apt-get update
     $ sudo apt-get install ansible
  ```
5. Generate public key: `$ ssh-keygen` and copy it(`$ cat ~/.ssh/id_rsa.pub`);
6. Add ssh-key to remote host. Choose one of the following:
  - From ansible server run this command: `$ ssh-copy-id root@198.18.134.49`
  - Or log into Centos1 (`$ ssh root@198.18.134.49`) and add key to authorized_keys file `$ sudo nano ~/.ssh/authorized_keys` (to save in nano use ctrl + X, then Y and Enter)
7. Repeat step 6 for Centos2
8. On Server machine (Ubunty in our case) create a new working directory `ansible`
  ```
  $ mkdir ansible
  $ cd ansible
  ```
9. Create **ansible.cfg** and **hosts** files(see below) \
   By default hosts and config files are in the home directory `/etc/ansible` so [**ansible.cfg**](https://github.com/anastaszi/272_enterprise/blob/master/lab1/ansible.cfg) and [**hosts**](https://github.com/anastaszi/272_enterprise/blob/master/lab1/hosts) could be updated there.
10. Check Ansible connection with ping `$ ansible apache -m ping -u root`\
    or run a simple command `$ ansible apache -m command -a "/bin/echo hello"`
> optional (as of now varialbes are set in the inventory)
> 10. Create file for storing variables with the name of the group: `$ sudo nano /etc/ansible/group_vars/apache`
11. Create playbook **apache.yml** (the name of the hosts group) `$ sudo nano apache.yml`\
    There are 2 versions: with the use of seport module [apache.yml](https://github.com/anastaszi/272_enterprise/blob/master/lab1/apache.yml) and without it [apache_without_seport.yml](https://github.com/anastaszi/272_enterprise/blob/master/lab1/apache_without_seport.yml)
12. To deploy servers:
  - Using apache.yml file
    - on port 8080, run the playbook `$ ansible-playbook apache.yml --skip-tags "undeploy"`
  - Using apache_without_seport.yml file
    - on port 80 run the playbook `$ ansible-playbook apache.yml --tags "deploy,port80"`
    - on port 8080 run the playbook `$ ansible-playbook apache.yml --tags "deploy,port8080"`
14. Check result
    * on port80 with `$ curl 198.18.134.49` and  `$ curl 198.18.134.50`
    * on port8080 with `$ curl 198.18.134.49:8080` and  `$ curl 198.18.134.50:8080`
15. To undeploy servers:
  - Using apache.yml file
    - run `$ ansible-playbook apache.yml --tags "undeploy"`

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

### Sources:
[Install Ansible on Ubuntu](https://www.techrepublic.com/article/how-to-install-ansible-on-ubuntu-server-18-04/)\
[Install Apache Server](https://www.bogotobogo.com/DevOps/Ansible/Ansible_SettingUp_Webservers_Apache.php)\
[Install Apache on Centos](https://codingbee.net/ansible/ansible-a-playbook-for-setting-up-an-apache-webserver)\
[Install Apache on Ansible](https://www.scaleway.com/en/docs/how-to-install-apache-on-ansible/)
[Ansible Documentation](https://docs.ansible.com/ansible/latest/index.html)\
[How to Create Ansible Plays and Playbooks](https://www.tecmint.com/create-ansible-plays-and-playbooks/)\
[Change port in Centos without seport](https://people.centos.org/arrfab/Events/Loadays-2014/managing%20selinux%20with%20your%20cfgmgmt%20solution.pdf)
