export const sectionList = [
  {
    slug: "stronghold",
    title: "stronghold",
    markdown:
      "![stronghold logo](assets/stronghold-logo.png)\n\n[![Downloads](http://pepy.tech/badge/stronghold)](http://pepy.tech/count/stronghold)\n\n`stronghold` is the easiest way to securely configure your Mac.\n\n![GIF demo](assets/stronghold-demo.gif)\n\nDesigned for macOS Sierra and High Sierra. _Not yet tested on macOS Mojave, but I'm working on updating it!_",
  },
  {
    slug: "usage",
    title: "Usage",
    markdown:
      "## **Usage**\n\n```\nUsage: stronghold.py [OPTIONS]\n\n  Securely configure your Mac.\n  Developed by Aaron Lichtman -> (Github: alichtman)\n\n\nOptions:\n  -lockdown  Set secure configuration without user interaction.\n  -v         Display version and author information and exit.\n  -help, -h  Show this message and exit.\n```",
  },
  {
    slug: "installation-options",
    title: "Installation Options",
    markdown:
      "## **Installation Options**\n\n1. Install with [`pip`](https://pypi.org/project/stronghold/)\n\n   - `$ pip install stronghold`\n   - `$ stronghold`\n\n2. Download the `stronghold` binary from Releases tab.",
  },
  {
    slug: "configuration-options",
    title: "Configuration Options",
    markdown:
      "## **Configuration Options**\n\n1. Firewall\n\n   - Turn on Firewall?\n     - This helps protect your Mac from being attacked over the internet.\n   - Turn on logging?\n     - If there IS an infection, logs are useful for determining the source.\n   - Turn on stealth mode?\n     - Your Mac will not respond to ICMP ping requests or connection attempts from closed TCP and UDP networks.\n\n2. General System Protection\n\n   - Enable Gatekeeper?\n     - Defend against malware by enforcing code signing and verifying downloaded applications before allowing them to run.\n   - Prevent automatic software whitelisting?\n     - Both built-in and downloaded software will require user approval for whitelisting.\n   - Disable Captive Portal Assistant and force login through browser on untrusted networks?\n     - Captive Portal Assistant could be triggered and direct you to a malicious site WITHOUT any user interaction.\n\n3. User Metadata Storage\n\n   - Clear language modeling metadata?\n     - This includes user spelling, typing and suggestion data.\n   - Disable language modeling data collection?\n   - Clear QuickLook metadata?\n   - Clear Downloads metadata?\n   - Disable metadata collection from Downloads?\n   - Clear SiriAnalytics database?\n\n4. User Safety\n\n   - Lock Mac as soon as screen saver starts?\n   - Display all file extensions?\n     - This prevents malware from disguising itself as another file type.\n   - Disable saving documents to the cloud by default?\n     - This prevents sensitive documents from being unintentionally stored on the cloud.\n   - Show hidden files in Finder?\n     - This lets you see all files on the system without having to use the terminal.\n   - Disable printer sharing?\n     - Offers redundancy in case the Firewall was not configured.",
  },
  {
    slug: "how-to-contribute",
    title: "How to Contribute",
    markdown:
      "## **How to Contribute**\n\n1. Clone repo and create a new branch: `$ git checkout https://github.com/alichtman/stronghold -b name_for_new_branch`.\n2. Make changes and test\n3. Submit Pull Request with comprehensive description of changes",
  },
  {
    slug: "acknowledgements",
    title: "Acknowledgements",
    markdown:
      "## **Acknowledgements**\n\n- [@shobrook](https://www.github.com/shobrook) for logo and UI design assistance.\n- Base logo vector made by [Freepik](https://www.freepik.com/) from [Flaticon](www.flaticon.com).\n- [drduh's macOS-Security-and-Privacy-Guide](https://github.com/drduh/macOS-Security-and-Privacy-Guide) and [Jonathan Levin's MacOS Security Guide](http://newosxbook.com/files/moxii3/AppendixA.pdf) were incredibly helpful while I was building `stronghold`.",
  },
  {
    slug: "donations",
    title: "Donations",
    markdown:
      "## **Donations**\n\nThis is free, open-source software. If you'd like to support the development of future projects, or say thanks for this one, you can donate BTC at `1FnJ8hRRNUtUavngswUD21dsFNezYLX5y9`.",
  },
];
