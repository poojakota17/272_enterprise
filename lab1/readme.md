1. Create a session on cisco.dcloud
2. Enable VPN (CiscoAnyConnect)
3. Connect to Ubuntu server (ssh cisco@198.18.134.28)
4. Install ansible
  1. install the necessary repository `sudo apt-add-repository ppa:ansible/ansible`;
  1. update apt with the command `sudo apt-get update`;
  1. install Ansible with the command `sudo apt-get install ansible -y`.
5. Generate public key: `ssh-keygen` and copy it(`cat ~/.ssh/id_rsa.pub`);
6. Log into Centos1 and add key to authorized_keys file `sudo nano ~/.ssh/authorized_keys` (to save in nano use ctrl + X, then Y and Enter)
7. Repeat step 6 for Centos2
8. Reconnect to ubuntu server and update hosts file `sudo nano /etc/ansible/hosts`

in progress
9. Create file for storing variables with the name of the group: `sudo nano /etc/ansible/group_vars/apache`



hosts file:\
`[apache]\
198.18.134.49 ansible_ssh_user=root\
198.18.134.50 ansible_ssh_user=root`

variable file:\
---\
centos1: 198.18.134.49\
centos2: 198.18.134.50


### Sources:
[Install Ansible on Ubuntu](https://www.techrepublic.com/article/how-to-install-ansible-on-ubuntu-server-18-04/)
