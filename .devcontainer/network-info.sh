#!/bin/bash

echo "========================================="
echo "         NETWORK INFORMATION"
echo "========================================="
echo ""

echo "🌐 PUBLIC IP ADDRESS:"
echo "-------------------"
curl -s https://ifconfig.me && echo ""
echo ""

echo "🔧 INTERNAL NETWORK INTERFACES:"
echo "-----------------------------"
if command -v ip &> /dev/null; then
    ip addr show
elif command -v ifconfig &> /dev/null; then
    ifconfig
else
    echo "Network tools not available yet. Please rebuild the devcontainer."
fi
echo ""

echo "🖥️  HOSTNAME INFORMATION:"
echo "------------------------"
echo "Hostname: $(hostname)"
if command -v hostname &> /dev/null; then
    echo "Internal IPs: $(hostname -I 2>/dev/null || echo 'Not available')"
fi
echo ""

echo "🔍 NETWORK ROUTES:"
echo "-----------------"
if command -v ip &> /dev/null; then
    ip route show
elif command -v route &> /dev/null; then
    route -n
else
    echo "Route information not available yet. Please rebuild the devcontainer."
fi
echo ""

echo "📡 DNS INFORMATION:"
echo "------------------"
if [ -f /etc/resolv.conf ]; then
    echo "DNS servers:"
    cat /etc/resolv.conf | grep nameserver
else
    echo "DNS information not available"
fi
echo ""

echo "🔌 LISTENING PORTS:"
echo "------------------"
if command -v netstat &> /dev/null; then
    netstat -tuln | head -20
elif command -v ss &> /dev/null; then
    ss -tuln | head -20
else
    echo "Port information not available yet. Please rebuild the devcontainer."
fi
echo ""

echo "========================================="
echo "Script completed successfully!"
echo "========================================="
