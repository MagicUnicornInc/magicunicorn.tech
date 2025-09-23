# Blog Post: Your Definitive Guide to Setting Up a Ryzen AI Development Environment

**Series:** Unicorn Unleashed: A Hacker's Guide

---

## The Frontier of Edge AI

The new generation of AMD Ryzen AI processors, with their powerful on-board NPUs, represents the new frontier of edge computing. However, being on the frontier means the maps aren't always clear, and setting up a stable, powerful development environment can be a major challenge. 

After countless hours of trial-and-error while building the **Unicorn Execution Engine**, we've created a reliable, step-by-step guide to get you from a fresh OS install to a fully functional NPU and iGPU development environment.

### Prerequisites

-   **Hardware:** An AMD Ryzen 7040/8040/9040 series APU with an integrated NPU.
-   **OS:** Ubuntu 24.04 LTS. While other systems work, this guide is tailored for the latest LTS release for maximum stability and driver compatibility.
-   **BIOS/UEFI:** Ensure "UMA_GAME_OPTIMIZED" or a similar setting is selected in your BIOS to dedicate sufficient memory to the iGPU, and that the NPU is enabled.

### Step 1: System Update & Core Dependencies

Let's start with a clean slate and install the essential tools for compiling software.

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y build-essential git curl python3-pip python3-venv python3-dev \
    libopenblas-dev libjpeg-dev zlib1g-dev libncurses5-dev \
    liblzma-dev libsqlite3-dev libreadline-dev libbz2-dev
```

### Step 2: Graphics and NPU Drivers (The Crucial Step)

This is where most setups fail. Getting the right drivers is key.

**For the iGPU (Radeon 780M):** We recommend the Kisak PPA for the most up-to-date, stable Mesa drivers for Vulkan and OpenCL.
```bash
sudo add-apt-repository ppa:kisak/kisak-mesa
sudo apt update
sudo apt upgrade -y
sudo apt install -y mesa-vulkan-drivers vulkan-tools
```
*Verify it works:* `vulkaninfo --summary | grep deviceName` should show your AMD Radeon graphics.

**For the NPU (Phoenix):** The Xilinx Runtime (XRT) is the low-level driver.
```bash
# Download the latest XRT .deb package from AMD/Xilinx
# The exact URL changes, so please check their official site.
wget <url-to-latest-xrt.deb>
sudo apt install ./<xrt-package-name>.deb
```
*Verify it works:* `/opt/xilinx/xrt/bin/xrt-smi examine` should show your system's devices without errors.

### Step 3: A Clean, Isolated Python with `pyenv`

Don't use the system Python! It can lead to dependency conflicts. `pyenv` lets you build and manage self-contained Python versions.

```bash
# Install pyenv
curl https://pyenv.run | bash

# Add pyenv to your shell (add to .bashrc or .zshrc and restart your shell)
export PATH="$HOME/.pyenv/bin:$PATH"
eval "$(pyenv init --path)"
eval "$(pyenv virtualenv-init -)"

# Build a fresh Python from source. This will take time but is worth it.
pyenv install 3.11.7

# Set it as your default Python for all new projects
pyenv global 3.11.7
```

### Step 4: Your First AI Project Environment

Now, let's create a dedicated virtual environment for an AI project.

```bash
# Create a directory for your project
mkdir ~/my-npu-project
cd ~/my-npu-project

# Create a virtual environment using your new pyenv Python
python -m venv .venv
source .venv/bin/activate

# Install the core libraries
# PyTorch for ROCm (for iGPU), ONNX, and the XRT Python bindings
pip install --upgrade pip
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm6.0
pip install onnx onnxruntime pyxrt
```

## You Are Ready to Innovate

Congratulations. You now have a stable, powerful, and correctly configured development environment for Ryzen AI. You can now target the iGPU for general-purpose compute and, more importantly, begin to unlock the power of the NPU with the `pyxrt` library.

This is the exact foundation we used to build the groundbreaking technologies at Unicorn Commander. We can't wait to see what you build with it.