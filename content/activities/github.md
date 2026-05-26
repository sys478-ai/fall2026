---
title: 'Configuring GitHub'
date: '2026-09-30'
type: 'activity'
---

> ## Overview
>
> The goal of this activity is to help you publish your web page to GitHub. To do this:
>
> 1. [Glance at the Background Readings](#part1)
> 1. [Register for GitHub](#part2)
> 1. [Install git](#part3)
> 1. [Configure the Git / Visual Studio Code Plugin](#part4)
> 1. [Configure Git Pages](#part5)

## 1. Reference / Background Readings <span id="part1"></span>

Please complete the following video tutorial: [Using GitHub with Visual Studio Code](https://youtu.be/i_23KUAEtUM) (how we will be using GitHub in this class).

## 2. Register for an account on GitHub <span id="part2"></span>

If you don’t already have a GitHub account, register for one: <a href="https://github.com/" target="_blank">https://github.com/join</a>. Some notes:

- Please remember your password.

## 3. Install Git <span id="part3"></span>

In order to interact with GitHub, you need to install git. Before you install it, check and make sure it’s not already installed by:

1. Windows: search for the software program "GitBash."
   - If you find it, git is already installed
   - If you don't, please download and install it using this link: <a href="https://git-scm.com/downloads/win" target="_blank">https://git-scm.com/downloads/win</a>.
2. Mac:
   - Opening your Terminal and type the word `git` at the command prompt.
   - If you don't get an error message, it's already installed. Move onto the next step.
   - If you get a message that says "not recognized" or something along those lines, then you need to install it by following these instructions: <a href="https://git-scm.com/downloads/mac" target="_blank">https://git-scm.com/downloads/mac</a>. You may need to install XCode by typing the following in your Terminal:

     ```bash
     xcode-select --install
     ```

## 4. Configure the Git / Visual Studio Code Plugin <span id="part4"></span>

### 1. Tell the system who you are

Tell your computer who you are on Git by running the commands shown below in GitBash (Windows) or in the Terminal (Mac). Please use **your name**, and the **email you used when registering with GitHub**.

```bash
git config --global user.name "Sarah"
git config --global user.email "my_email@gmail.com"
```

### 2. Initialize a Git Repository

After you've doublechecked your file structure, **open your entire `mser521` folder** in VS Code by:

1. Clicking the paper icon in the left-hand toolbar towards the top.
1. Clicking the "Add Folder" button (blue), located in the left-hand panel.
1. Navigating to your `mser521` directory.

Once you've done this, click on the icon that looks like a tree branch (left-hand toolbar), and click the blue button that says "Initialize Repository":

<img class="screenshot-lg" src="/fall2025/images/activities/configure-github/ss2.png" />

You have now created a git repository on your computer in the same folder as your `mser521` folder. Now, you will want to "stage" all of your changes. Click the button with the three dots, then select "Changes", and then "Stage All changes":

<img class="screenshot-lg" src="/fall2025/images/activities/configure-github/ss3.png" />

After you "stage" your changes, you will note that the left-hand panel has changed. Specifically:

- The panel lists all of the files that are "staged" to be committed, with an "A" next to each file (indicating that you are adding the files for the first time).
- To commit these changes, type a message in the text box that says **"My First Commit"** and then click the check button to actually issue the commit:

<img class="screenshot-lg" src="/fall2025/images/activities/configure-github/ss4.png" />

Afterwards, a button will appear that says "Publish Branch." Click this button. It may prompt you to install a GitHub plugin. Please agree that you are OK to install the GitHub plugin.

<img class="screenshot-lg" src="/fall2025/images/activities/configure-github/ss5.png" />

You will now create a new GitHub repository called **`mser521`** (instead of csci185-coursework as pictured in the images below). Please ensure that you create a **PUBLIC** repository:

<img class="screenshot-lg" src="/fall2025/images/activities/configure-github/ss6.png" />

After VS code issues the "create repository" request to GitHub, it will give you a message indicating that your files are being sent up to GitHub. When the file transfer is complete, you will see a blue button that says "Open On GitHub". Click that button.

<img class="screenshot-lg" src="/fall2025/images/activities/configure-github/ss7.png" />

Clicking the button will open your newly created `mser521` repository and show you all of your files (which are now in the cloud):

<img class="screenshot-lg" src="/fall2025/images/activities/configure-github/ss8.png" />

## 5. Finally, Configure GitHub Pages <span id="part5"></span>

GitHub also allows you to host pages. To enable GitHub pages:

1. Go to your repository and click on the settings tab.
2. Click the "GitHub Pages" link in the left-hand menu
3. Click the dropdown menu that asks you to select a branch.
4. Select the "master" branch
5. Click "Save"

<img class="screenshot-lg" src="/fall2025/images/activities/configure-github/ss9.png" />

This will generate a link to your GitHub site.

<img class="screenshot-lg" src="/fall2025/images/activities/configure-github/ss10.png" />

> ### A note on GitHub Pages
>
> - It make take a few minutes for your webpage to display
> - In order to preview the webpage you made in the `intro-html` folder, you have to append the `/intro-html/index.html` file path to the end of your github pages to indicate which file to display.
