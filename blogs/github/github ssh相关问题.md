---
title: github ssh
date: 2021-04-08
tags:
 - github
categories:
 - github
---

# ssh git@github.com: Permission denied (publickey).

## 原因分析
我当时出现这个问题的情况是因为我电脑上有一个默认的 id_rsa 这个key 是映射到公司的gitlab的，然后我又新建了一个 github密钥，然后将公钥配置到 github 的ssh 上。这样第一次配置的时候可以用的，后来重启后几次电脑之后，发现就不可以用了，应该是github取的是默认的 id_rsa 密钥，导致验证失败，权限不通过。

ok原因分析清楚 在网上找到教程后，可以单独添加github 的密码路径，也就是让github 指向指定的密钥文件，这样就不会取默认的id_rsa密钥。

### 第一步
如果你已经有了密钥，那就直接用以前的密钥，运行以下命令，查看权限。

```shell
ssh -v git@github.com
OpenSSH_8.1p1, LibreSSL 2.7.3
debug1: Reading configuration data /Users/longfengzhang/.ssh/config
debug1: Reading configuration data /etc/ssh/ssh_config
debug1: /etc/ssh/ssh_config line 47: Applying options for *
debug1: Connecting to github.com port 22.
debug1: Connection established.
debug1: identity file /Users/longfengzhang/.ssh/id_rsa type 0
debug1: identity file /Users/longfengzhang/.ssh/id_rsa-cert type -1
debug1: identity file /Users/longfengzhang/.ssh/id_dsa type -1
debug1: identity file /Users/longfengzhang/.ssh/id_dsa-cert type -1
debug1: identity file /Users/longfengzhang/.ssh/id_ecdsa type -1
debug1: identity file /Users/longfengzhang/.ssh/id_ecdsa-cert type -1
debug1: identity file /Users/longfengzhang/.ssh/id_ed25519 type 3
debug1: identity file /Users/longfengzhang/.ssh/id_ed25519-cert type -1
debug1: identity file /Users/longfengzhang/.ssh/id_xmss type -1
debug1: identity file /Users/longfengzhang/.ssh/id_xmss-cert type -1
debug1: Local version string SSH-2.0-OpenSSH_8.1
debug1: Remote protocol version 2.0, remote software version babeld-0913e7e1
debug1: no match: babeld-0913e7e1
debug1: Authenticating to github.com:22 as 'git'
debug1: SSH2_MSG_KEXINIT sent
debug1: SSH2_MSG_KEXINIT received
debug1: kex: algorithm: curve25519-sha256
debug1: kex: host key algorithm: rsa-sha2-512
debug1: kex: server->client cipher: chacha20-poly1305@openssh.com MAC: <implicit> compression: none
debug1: kex: client->server cipher: chacha20-poly1305@openssh.com MAC: <implicit> compression: none
debug1: expecting SSH2_MSG_KEX_ECDH_REPLY
debug1: Server host key: ssh-rsa SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8
debug1: Host 'github.com' is known and matches the RSA host key.
debug1: Found key in /Users/longfengzhang/.ssh/known_hosts:4
debug1: rekey out after 134217728 blocks
debug1: SSH2_MSG_NEWKEYS sent
debug1: expecting SSH2_MSG_NEWKEYS
debug1: SSH2_MSG_NEWKEYS received
debug1: rekey in after 134217728 blocks
debug1: Will attempt key: /Users/longfengzhang/.ssh/id_rsa RSA SHA256:nh67KJzrWYdgAcIvDZjYy2/POoT6IuIi91MtZqIVLHs
debug1: Will attempt key: /Users/longfengzhang/.ssh/id_dsa 
debug1: Will attempt key: /Users/longfengzhang/.ssh/id_ecdsa 
debug1: Will attempt key: /Users/longfengzhang/.ssh/id_ed25519 ED25519 SHA256:9HZ/VFt5Xbt0fYqjsMut6Wpt2Ev+ZvBc5k6Sm9vruFs
debug1: Will attempt key: /Users/longfengzhang/.ssh/id_xmss 
debug1: SSH2_MSG_EXT_INFO received
debug1: kex_input_ext_info: server-sig-algs=<ssh-ed25519-cert-v01@openssh.com,ecdsa-sha2-nistp521-cert-v01@openssh.com,ecdsa-sha2-nistp384-cert-v01@openssh.com,ecdsa-sha2-nistp256-cert-v01@openssh.com,sk-ssh-ed25519-cert-v01@openssh.com,sk-ecdsa-sha2-nistp256-cert-v01@openssh.com,rsa-sha2-512-cert-v01@openssh.com,rsa-sha2-256-cert-v01@openssh.com,ssh-rsa-cert-v01@openssh.com,ssh-dss-cert-v01@openssh.com,sk-ssh-ed25519@openssh.com,sk-ecdsa-sha2-nistp256@openssh.com,ssh-ed25519,ecdsa-sha2-nistp521,ecdsa-sha2-nistp384,ecdsa-sha2-nistp256,rsa-sha2-512,rsa-sha2-256,ssh-rsa,ssh-dss>
debug1: SSH2_MSG_SERVICE_ACCEPT received
debug1: Authentications that can continue: publickey
debug1: Next authentication method: publickey
debug1: Offering public key: /Users/longfengzhang/.ssh/id_rsa RSA SHA256:nh67KJzrWYdgAcIvDZjYy2/POoT6IuIi91MtZqIVLHs
debug1: Authentications that can continue: publickey
debug1: Trying private key: /Users/longfengzhang/.ssh/id_dsa
debug1: Trying private key: /Users/longfengzhang/.ssh/id_ecdsa
debug1: Offering public key: /Users/longfengzhang/.ssh/id_ed25519 ED25519 SHA256:9HZ/VFt5Xbt0fYqjsMut6Wpt2Ev+ZvBc5k6Sm9vruFs
debug1: Authentications that can continue: publickey
debug1: Trying private key: /Users/longfengzhang/.ssh/id_xmss
debug1: No more authentication methods to try.
git@github.com: Permission denied (publickey).
```

可以发现上述输出的日志中使用了默认的ssh 密钥

```
Will attempt key: /Users/longfengzhang/.ssh/id_dsa 
debug1: Will attempt key: /Users/longfengzhang/.ssh/id_ecdsa 
debug1: Will attempt key: /Users/longfengzhang/.ssh/id_ed25519

```
从而导致

```
debug1: No more authentication methods to try.
git@github.com: Permission denied (publickey).

```

## 第二步

```shell
ssh-agent -s 

SSH_AUTH_SOCK=/var/folders/nv/w8_vn87j7d1_8zb10j99y_w40000gn/T//ssh-4EsbhD5w1VOx/agent.71560; export SSH_AUTH_SOCK;
SSH_AGENT_PID=71561; export SSH_AGENT_PID;
echo Agent pid 71561;
```
运行 ssh-agent 代理。后续安排文档讲解 ssh-agent的功能和作用。

## 第三步

```shell
sh-add ~/.ssh/github

Identity added: /Users/longfengzhang/.ssh/github (peakDragonCheung@github.com)
```

这里我添加github 的密钥，自己识别需要验证的邮箱，

## 第四步
验证权限
```shell
ssh -T git@github.com

Hi peakDragonCheung! You've successfully authenticated, but GitHub does not provide shell access.
```

就会发现可以通过权限了，这个时候就可以拉代码了，和推代码了。





