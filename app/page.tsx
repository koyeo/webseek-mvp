import fs from "fs";
import path from "path";
import Link from "next/link";

function getSubRoutes() {
    const appDir = path.join(process.cwd(), "app");

    const entries = fs.readdirSync(appDir, {withFileTypes: true});

    const directories = entries
        .filter((entry) => entry.isDirectory())
        // 过滤掉不想展示的目录，比如 Next 保留目录等
        .filter((entry) => !["node_modules"].includes(entry.name));

    // 这里简单认为每个子目录都是一个路由，如 /usehook-setstate
    // 你可以按需再过滤掉 layout / (group) 等特殊目录
    return directories.map((dir) => `/${dir.name}`);
}

export default function Home() {
    const routes = getSubRoutes();
    return (
        <div className="p-6 flex flex-col gap-4">
            <h1>子路由列表</h1>
            <ul>
                {routes.map((route) => (
                    <li key={route}>
                        <Link href={route}>{route}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
