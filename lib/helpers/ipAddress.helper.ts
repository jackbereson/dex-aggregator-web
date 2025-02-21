export const fetchResultGeo = async () => {
  try {
    const result = await fetch("https://geolocation-db.com/json/")
      .then((res) => res.json())
      .catch(() => "error_ip");

    return result;
  } catch {
    return null;
  }
};

export function GetMyIP(callback: any) {
  fetch("https://api.ipify.org?format=json", {
    method: "GET",
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((result) => {
      callback(null, result.ip);
    })
    .catch((error) => callback(error, null));
}
