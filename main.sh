PORT=54321

while true; do {
    read -r request
    echo "${request}"
} | nc -l -p "${PORT}"
done