import { CloudDownload, CloudUpload, GitBranch, KeyRound, RefreshCcw } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Drawer } from "../../components/ui/drawer";
import { Input } from "../../components/ui/input";
import { Switch } from "../../components/ui/switch";

function SettingRow({ title, description, children }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-[24px] border border-border/70 bg-white/65 p-4">
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
      description="GitHub Gist 设置被收拢到独立面板中，主界面只保留状态摘要和入口。"
      onClose={onClose}
      open={open}
      title="同步设置"
    >
      <div className="space-y-5">
        <div className="grid gap-5 rounded-[28px] border border-border/70 bg-secondary/35 p-5">
          <div>
            <p className="section-kicker">Credentials</p>
            <h3 className="mt-2 text-base font-medium text-foreground">GitHub Gist</h3>
          </div>

          <label className="space-y-2">
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <KeyRound className="size-4" strokeWidth={1.8} />
              GitHub Personal Access Token
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
              placeholder="首次可留空，系统会在同步时自动创建"
              value={settings.gistId}
            />
          </label>
        </div>

        <div className="grid gap-3">
          <SettingRow
            description="添加、删除、完成、搁置或记账后，自动把最新数据推送到现有 Gist。"
            title="自动同步"
          >
            <Switch checked={settings.autoSync} onClick={() => onChange({ autoSync: !settings.autoSync })} />
          </SettingRow>
          <SettingRow
            description="应用启动时自动从云端拉取一次，适合你在多设备之间来回切换。"
            title="自动拉取"
          >
            <Switch checked={settings.autoPull} onClick={() => onChange({ autoPull: !settings.autoPull })} />
          </SettingRow>
        </div>

        <div className="rounded-[28px] border border-border/70 bg-white/70 p-5">
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone={settings.gistId ? "success" : "neutral"}>
              {settings.gistId ? "Gist 已连接" : "尚未绑定 Gist"}
            </Badge>
            <Badge tone={settings.autoSync ? "ink" : "soft"}>
              {settings.autoSync ? "自动同步开启" : "手动同步模式"}
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

          <div className="mt-4 flex items-start gap-3 rounded-[20px] border border-border/70 bg-secondary/45 px-4 py-3 text-sm leading-6 text-muted-foreground">
            <RefreshCcw className="mt-0.5 size-4 shrink-0" strokeWidth={1.8} />
            <p>沿用原有本地存储键与 Gist 文件结构，现有数据无需迁移即可继续使用。</p>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
