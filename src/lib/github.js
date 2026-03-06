const API_BASE = "https://api.github.com";

async function githubRequest(token, endpoint, method, body) {
  if (!token) {
    throw new Error("请先输入 GitHub Token");
  }

  const headers = {
    Authorization: `token ${token}`,
    Accept: "application/vnd.github.v3+json",
  };

  if (body) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    let message = "请求失败";

    try {
      const payload = await response.json();
      message = payload.message || message;
    } catch {
      // Ignore JSON parse failures for non-JSON responses.
    }

    throw new Error(message);
  }

  return response.json();
}

export async function createGist(token, data) {
  const gist = await githubRequest(token, "/gists", "POST", {
    description: "纸黄待办数据",
    public: false,
    files: {
      "todos.json": {
        content: JSON.stringify(data, null, 2),
      },
    },
  });

  return gist.id;
}

export async function updateGist(token, gistId, data) {
  await githubRequest(token, `/gists/${gistId}`, "PATCH", {
    files: {
      "todos.json": {
        content: JSON.stringify(data, null, 2),
      },
    },
  });
}

export async function getGist(token, gistId) {
  const gist = await githubRequest(token, `/gists/${gistId}`, "GET");
  const file = gist.files["todos.json"] || gist.files["data.json"];

  if (!file?.content) {
    throw new Error("未找到可读取的数据文件");
  }

  return JSON.parse(file.content);
}
