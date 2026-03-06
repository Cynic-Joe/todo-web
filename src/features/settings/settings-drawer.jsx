import { CloudDownload, CloudUpload, GitBranch, KeyRound, RefreshCcw } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Drawer } from "../../components/ui/drawer";
import { Input } from "../../components/ui/input";
import { Switch } from "../../components/ui/switch";

function SettingRow({ title, description, children }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-[24px] border border-border/65 bg-card/72 p-4">
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}

export function SettingsDrawer({
  open,
  onClose,
  settings,
  onChange,
  onSync,
  onPull,
  busyState,
}) {
  return (
    <Drawer
      description="把云端同步相关设置收在这里，主页面只保留入口。"
      onClose={onClose}
      open={open}
      title="同步设置"
    >
      <div className="space-y-5">
        <div className="grid gap-5 rounded-[28px] border border-border/65 bg-secondary/34 p-5">
          <div>
            <p className="section-kicker">云端信息</p>
            <h3 className="mt-2 text-base font-medium text-foreground">GitHub Gist</h3>
          </div>

          <label className="space-y-2">
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <KeyRound className="size-4" strokeWidth={1.8} />
              GitHub 令牌
            </span>
            <Input
              onChange={(event) => onChange({ token: event.target.value })}
              placeholder="ghp_xxxxxxxxxxxx"
              type="password"
              value={settings.token}
            />
          </label>

          <label className="space-y-2">
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <GitBranch className="size-4" strokeWidth={1.8} />
              Gist ID
            </span>
            <Input
              onChange={(event) => onChange({ gistId: event.target.value })}
              placeholder="第一次可以留空，同步时会自动创建"
              value={settings.gistId}
            />
          </label>
        </div>

        <div className="grid gap-3">
          <SettingRow
            description="每次改动后自动把最新数据推送到当前 Gist。"
            title="自动同步"
          >
            <Switch checked={settings.autoSync} onClick={() => onChange({ autoSync: !settings.autoSync })} />
          </SettingRow>
          <SettingRow
            description="打开页面时自动从云端拉取一次最新内容。"
            title="自动拉取"
          >
            <Switch checked={settings.autoPull} onClick={() => onChange({ autoPull: !settings.autoPull })} />
          </SettingRow>
        </div>

        <div className="rounded-[28px] border border-border/65 bg-card/76 p-5">
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone={settings.gistId ? "success" : "neutral"}>
              {settings.gistId ? "已连接 Gist" : "尚未绑定 Gist"}
            </Badge>
            <Badge tone={settings.autoSync ? "ink" : "soft"}>
              {settings.autoSync ? "自动同步已开启" : "手动同步"}
            </Badge>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Button disabled={busyState.sync} onClick={onSync} variant="primary">
              <CloudUpload className="size-4" strokeWidth={1.8} />
              {busyState.sync ? "同步中..." : "同步到云端"}
            </Button>
            <Button disabled={busyState.pull} onClick={onPull} variant="secondary">
              <CloudDownload className="size-4" strokeWidth={1.8} />
              {busyState.pull ? "拉取中..." : "从云端拉取"}
            </Button>
          </div>

          <div className="mt-4 flex items-start gap-3 rounded-[20px] border border-border/65 bg-secondary/42 px-4 py-3 text-sm leading-6 text-muted-foreground">
            <RefreshCcw className="mt-0.5 size-4 shrink-0" strokeWidth={1.8} />
            <p>继续沿用原有本地存储键和 Gist 文件结构，现有数据不需要迁移。</p>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
