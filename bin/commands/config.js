import { defaultConfig, configPath } from '../constants.js';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { decode, encode } from 'ini';
const getActionAndProperty = (option) => {
    let action = '';
    let property = '';
    const keys = Object.keys(option || {});
    if (keys.length > 0) {
        action = keys[0];
        property = option[action];
    }
    return {
        action,
        property
    };
};
export default function (value, option) {
    const config = getConfig();
    const { action, property } = getActionAndProperty(option);
    if (action === 'get') {
        console.log(config[property]);
    }
    else if (action === 'set') {
        config[property] = value;
        // 初始化创建configPath
        writeFileSync(configPath, encode(config));
    }
    else if (action === 'delete') {
        delete config[property];
        if (existsSync(configPath)) {
            writeFileSync(configPath, encode(config));
        }
    }
}
export function getConfig() {
    const config = {};
    if (existsSync(configPath)) {
        const userConfig = decode(readFileSync(configPath, 'utf-8'));
        Object.assign(config, defaultConfig, userConfig);
    }
    return config;
}
