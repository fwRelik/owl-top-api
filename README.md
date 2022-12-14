# API request documentation.

![GitHub last commit](https://img.shields.io/github/last-commit/fwRelik/owl-top-api) [![api-e2e](https://github.com/fwRelik/owl-top-api/actions/workflows/tests.yml/badge.svg)](https://github.com/fwRelik/owl-top-api/actions/workflows/tests.yml) [![api-build](https://github.com/fwRelik/owl-top-api/actions/workflows/build.yml/badge.svg)](https://github.com/fwRelik/owl-top-api/actions/workflows/build.yml)

## About

This API was created for the [owl-top-app](https://github.com/fwRelik/owl-top-app) project.

## Get Started

The necessary environment variables that need to be set before starting are located in the `env.skeleton.txt` file.

Installing all dependencies and start API.

> If using a node higher than version `14.21.1` then use `--legacy-peer-deps`.

```cmd
npm i
```

```cmd
npm start
```

## Table of Contents

-   [Auth Requests](#auth-requests)
-   [Product Requests](#product-requests)
-   [Page Requests](#page-requests)
-   [Review Requests](#review-requests)
-   [Image .jpg to .webp Requests](#image-jpg-to-webp-requests)
-   [Telegram Requests](#telegram-requests)
-   [XML Requests](#xml-requests)

---

## Auth Requests

| Method | Path | Headers | Body | Response (Positive Outcome) |
| --- | --- | --- | --- | --- |
| POST | `/api/auth/login` | `Content-Type: application/json` | [Auth Body](#auth-body) | [Login Response](#login-response) |
| POST | `/api/auth/register` | `Content-Type: application/json` | [Auth Body](#auth-body) | [Register Response](#register-response) |

### Auth Body

```json
{
  "login": "string",
  "password": "string"
}
```

### Login Response

```json
{
  "access_token": "string"
}
```

### Register Response

```json
{
  "_id": "string",
  "email": "string",
  "passwordHash": "string",
  "createdAt": "Date",
  "updatedAt": "Date",
  "__v": "number"
}
```

---

## Product Requests

| Method | Path | Headers | Body | Response (Positive Outcome) |
| --- | --- | --- | --- | --- |
| GET | `/api/product/:productId` | `Authorization: Bearer [JWT]` | null | [Product Response](#product-response) |
| POST | `/api/product/create` | `Content-Type: application/json`, `Authorization: Bearer [JWT]` | [Product Body](#product-body) | [Product Response](#product-response) |
| POST | `/api/product/find` | `Content-Type: application/json` | [Product Find Body](#product-find-body) | [Product Response (Array)](#product-response) |
| PATCH | `/api/product/:productId` | `Content-Type: application/json`, `Authorization: Bearer [JWT]` | [Product Body](#product-body) | [Product Response](#product-response) |
| DELETE | `/api/product/:productId` | `Authorization: Bearer [JWT]` | null | [Product Response](#product-response) |

### Product Find Body

```json
{
  "category": "string",
  "limit": "number"
}
```

### Product Body

```json
{
  "image": "string",
  "title": "string",
  "price": "number",
  "oldPrice": "number",
  "credit": "number",
  "calculatedRating": "number",
  "description": "string",
  "advantages": "string",
  "disAdvantages": "string",
  "categories": ["string"],
  "tags": ["string"],
  "characteristics": [
    {
      "name": "string",
      "value": "number"
    }
  ]
}
```

### Product Response

```json
{
  "_id": "string",
  "image": "string",
  "title": "string",
  "price": "number",
  "oldPrice": "number",
  "credit": "number",
  "calculatedRating": "number",
  "description": "string",
  "advantages": "string",
  "disAdvantages": "string",
  "categories": ["string"],
  "tags": ["string"],
  "characteristics": [
    {
      "name": "string",
      "value": "number"
    }
  ],
  "__v": "string"
}
```

---

## Page Requests

| Method | Path | Headers | Body | Response (Positive Outcome) |
| --- | --- | --- | --- | --- |
| GET | `/api/page/:pageId` | `Authorization: Bearer [JWT]` | null | [Page Response](#page-response) |
| GET | `/api/page/byAlias/[alias]` | null | null | [Page Response](#page-response) |
| GET | `/api/page/textSearch/[text]` | null | null | [Page Response (Array)](#page-response) |
| POST | `/api/page/find` | `Content-Type: application/json` | [Page Find Body](#page-find-body) | [Page Find Response (Array)](#page-find-response) |
| POST | `/api/page/create` | `Content-Type: application/json`, `Authorization: Bearer [JWT]` | [Page Body](#page-body) | [Page Response](#page-response) |
| PATCH | `/api/page/:pageId` | `Content-Type: application/json`, `Authorization: Bearer [JWT]` | [Page Body](#page-body) | [Page Response](#page-response) |
| DELETE | `/api/page/:pageId` | `Authorization: Bearer [JWT]` | null | [Page Response](#page-response) |

### Page Find Body

```json
{
  "firstCategory": "number"
}
```

### Page Body

```json
{
  "firstCategory": "string",
  "secondCategory": "string",
  "alias": "string",
  "title": "string",
  "category": "string",
  "advantages": [
    {
      "title": "string",
      "description": "string"
    }
  ],
  "seoText": "string",
  "seoTitle": "string",
  "seoDescription": "string",
  "tagsTitle": "string",
  "tags": ["string"],
  "hh": {
    "count": "number",
    "juniorSalary": "number",
    "middleSalary": "number",
    "seniorSalary": "number"
  }
}
```

### Page Response

```json
{
  "_id": "string",
  "firstCategory": "string",
  "secondCategory": "string",
  "alias": "string",
  "title": "string",
  "category": "string",
  "advantages": [
    {
      "title": "string",
      "description": "string",
      "_id": "string"
    }
  ],
  "seoText": "string",
  "seoTitle": "string",
  "seoDescription": "string",
  "tagsTitle": "string",
  "tags": ["string"],
  "hh": {
    "count": "number",
    "juniorSalary": "number",
    "middleSalary": "number",
    "seniorSalary": "number",
    "updatedAt": "Date",
    "_id": "string"
  },
  "createdAt": "Date",
  "updatedAt": "Date",
  "__v": 0
}
```

### Page Find Response

```json
[
  {
    "_id": {
      "secondCategory": "string"
    },
    "pages": [
      {
        "alias": "string",
        "title": "string",
        "_id": "string",
        "category": "string"
      }
    ]
  }
]
```

---

## Review Requests

| Method | Path | Headers | Body | Response (Positive Outcome) |
| --- | --- | --- | --- | --- |
| GET | `/api/review/byProduct/:productId` | null | null | [Review Response (Array)](#review-response) |
| POST | `/api/review/create` | `Content-Type: application/json` | [Review Body](#review-body) | [Review Response](#review-response) |
| DELETE | `/api/review/:reviewId` | `Authorization: Bearer [JWT]` | null | [Review Response](#review-response) |

### Review Body

```json
{
  "name": "string",
  "title": "string",
  "description": "string",
  "rating": "number",
  "productId": "string"
}
```

### Review Response

```json
{
  "_id": "string",
  "name": "string",
  "title": "string",
  "description": "string",
  "rating": "number",
  "productId": "string",
  "createdAt": "Date",
  "updatedAt": "Date",
  "__v": "number"
}
```

---

## Image .jpg to .webp Requests

| Method | Path | Headers | Body | Response (Positive Outcome) |
| --- | --- | --- | --- | --- |
| POST | `/api/files/upload` | `Content-Type: multipart/form-data`, `Authorization: Bearer [JWT]` | File Interceptor: `files` | [Image Response](#image-response) |
| GET | `/static/[yyyy-MM-dd]/[file_name].[format]` | null | null | Image |

### Image Response

```json
[
  {
    "url": "[yyyy-MM-dd]/[file_name].jpg",
    "name": "[file_name].jpg"
  },
  {
    "url": "[yyyy-MM-dd]/[file_name].webp",
    "name": "[file_name].webp"
  }
]
```

---

## Telegram Requests

| Method | Path | Headers | Body | Response (Positive Outcome) |
| --- | --- | --- | --- | --- |
| POST | `/api/review/notify` | `Content-Type: application/json` | [Telegram Body](#telegram-body) | null |

### Telegram Body

```json
{
  "name": "string",
  "title": "string",
  "description": "string",
  "rating": "number",
  "productId": "string"
}
```

---

## XML Requests

| Method | Path               | Headers | Body | Response (Positive Outcome)   |
| ------ | ------------------ | ------- | ---- | ----------------------------- |
| GET    | `/api/sitemap/xml` | null    | null | [XML Response](#xml-response) |

### XML Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>[domain]</loc>
    <lastmod>[Date]</lastmod>

    <!-- Depends on page level -->
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```
