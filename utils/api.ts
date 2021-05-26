export function post<Data>(url: string, data: Data): Promise<any> {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const responseData = await response.json();

        if (response.ok) {
          resolve(responseData);
        } else {
          reject(responseData);
        }
      })
      .catch(() => {
        reject({
          submitError: "Something went wrong.",
        });
      });
  });
}
