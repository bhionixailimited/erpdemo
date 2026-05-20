import admin from "firebase-admin";

admin.apps.length === 0 &&
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: "firebase-adminsdk-6fwjw@yard-erp.iam.gserviceaccount.com",
      privateKey:
        "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCioF6r40GLaKoM\niLxJJKhX5M/SnQyIGScG5uRJebgzd+WyuK4FnObxAEjqiBj7yylWy4kYhI7ziwsv\nTcDg++1T+iVT+74h3q2VovqgL6ZCS7fhGdihV/CtEHpD6gc1iK1fAHbBGbzdc2r1\nWR7bJBZH1uXJlgAlBGzTLQ3wzAGOLNoB1Adr3+JJJxQ6zFC/KKrrfoxWT1CFhyJY\nCIaL8JK1vPg1QpDY7oClO79Tzz06xIRnlxgCMbW7/JNpdOyToe6g8DYH/7a12ZZR\nzZL+27IZnF6rEzblBYpaN4MuFmySyfhJ1LiKibeWSf3z1CU895R8lvgE3guGyt2/\nfVO3bLERAgMBAAECggEANbynO8YOuPmfQyAFk2e9BroRYAdMBkbFahbudUb2sm8a\nY/l5a1pix1zwOys4ki8aHFeKGCNpNxmJWxqmstEcJWUhY4RqWbfChREDHt5P4lUx\nz/xh5EJyQUWSGRHiSvK8UwmMtBcEnOpP+/10YDYm9JsSeA+MQa8aJJedJSXMF8W8\nPwdgToJ+x/eLQ9RHtl1FCe5PRHAimv+gqAn9xgMwi2Ns4VhZNNgScQdLa1SZCr8s\nJh7zGELiOfFoJrr3EkYNQWoeFC4maVAEKwGsy6w37FvReayeffjM+dsX+mIjteHf\n5fbpMYRXh32vpRQKabjiz85ESBeCUsrQt4YzU785bwKBgQDX2Dinc7eaiCmH0goq\nrFKCNo+5C0Rq/47nAoc5XQHYUlXT6TEG/3K5xPMegB5/AZyxt3mSZRLk7/wQMO9Q\nvoUwk0FUFJs/bifKV4s55t4kyYt2J5Td+H+VzC9oNSDQkVyd77Zsw8g7qsdF/yYe\nUeS10ezJAQUlSUOAMVRjq3hANwKBgQDA4ZbLxtQjMkcX0ka/7y7l6DpkTeSHin6Z\nSIFwjZry10D0ioTHj7DH7tVJZM+HFviiBXicGgO4jxoib829ZAzantWrQVKk27NE\nz38wiTjoELlFjf7tdzKSt+oRpsr33TYH8MSBDPydUtJmTsBYMZdYxjtGBXOYonuI\nNAQmqBkk9wKBgAxCIWWRMto55XHrQdyOkNkIVD1EIIybGviPsjJVz+cDNhCk673k\nABYA03Xl/NVluAp3yxW/W8VYw83/mXfSein6Evm9eduuW+An/KY7MF6Se7MoKFI6\n7LQLNp4KdmSh/MqTdJ7Ut6h72HlnNjj+maih1XrM7gfiE01Sf+JxOJEdAoGBALK+\nG516A0seo61aqz/g6ogaPkqHuJk26f0oqPNh9s7GVaaI22WILl4JYVRjfMIGsqCL\nC2s13G7jBmgVTgcNua+7c+0BWxH1m1rQI2EaOUctgFQJs83iIVa/4sU62Wr7b7/K\nCoBBRbSRdPNkVXEle8jD41gPY0F2iZ39/j7IloyfAoGAe0KrOnX1A8DnOgUMGeze\n4xXG033AxizOR2UQ4SeIuPpOyTbhHiwwuta6+PmOXrh7zK4t8cutD4Lp3hIsi8/Q\nE9nYuJGv0NlKzNB3p9ddwb4fhlSbGrEfl88LpfDQdPkBGJAyP40Y1XQsyAmEkomk\nKKU6sQvAas+oY6IivQkKypY=\n-----END PRIVATE KEY-----\n",
      projectId: "yard-erp",
    }),
    databaseURL: "https://yard-erp-default-rtdb.firebaseio.com",
  });

export { admin };
