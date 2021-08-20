const getName = (arn) => arn.split(":").slice(-1)[0];

const getColorInstance = (public_ip) => {
    const instances = [
        "52.207.207.55",
        "3.84.10.168",
        "54.152.216.53",
    ]

    if (public_ip == instances[0]) return 'aqua';
    if (public_ip == instances[1]) return 'gold';
    if (public_ip == instances[2]) return 'lightpink';
    else return 'violet';
}

const color_instances = { 
    "52.207.207.55": 'aqua',
    "3.84.10.168": 'gold',
    "54.152.216.53": 'lightpink',
}

export { getName, getColorInstance}