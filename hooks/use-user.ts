interface User {
  message: any; // need to make this more legit
  success: boolean;
}

export async function fetchAllUsers(request: RequestInfo): Promise<User> {
  try {
    const response = await fetch(request);
    const body = await response.json();
    return body;
  } catch (error: any) {
    console.error(error);
    return { message: 'Error', success: false };
  }
}
