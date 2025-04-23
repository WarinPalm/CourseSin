-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 23, 2025 at 09:22 AM
-- Server version: 8.0.40
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `coursesin`
--

-- --------------------------------------------------------

--
-- Table structure for table `Categories`
--

CREATE TABLE `Categories` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Categories`
--

INSERT INTO `Categories` (`id`, `name`, `created_at`) VALUES
('00c98e4b-c58c-4e7c-930d-942ee7b407cc', 'TypeScript', '2025-04-14 02:52:01.029'),
('00d5fd0e-fa41-4a27-a1e7-a7d1cb032cd8', 'JavaScript', '2025-04-14 02:51:54.028'),
('0236c0e0-349d-4fb9-a9e4-c8d84b501548', 'C#', '2025-04-14 02:51:32.877'),
('04a7e022-43f7-4f2a-bef5-2d4ec08785df', 'Python', '2025-04-14 02:52:20.954'),
('2fe9e44f-c6e0-490a-9e2e-54f0eeb14262', 'React', '2025-04-14 02:52:05.879'),
('3ef92bbc-0fb4-461b-9154-d2c4dc8316ae', 'Flutter', '2025-04-14 02:52:16.696'),
('53a778ad-756d-45bc-8819-5611ef6412e0', 'CSS', '2025-04-14 02:51:42.243'),
('6123741e-9756-4796-8f00-38ea4ef3989f', 'HTML', '2025-04-14 02:51:46.012'),
('c13284ec-1c7d-4870-bc0d-cf14d8e1016d', 'ReactNative', '2025-04-14 02:52:12.032'),
('d0196510-50fc-496e-b1a8-86181fc16532', 'C++', '2025-04-14 02:51:38.645');

-- --------------------------------------------------------

--
-- Table structure for table `Courses`
--

CREATE TABLE `Courses` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `benefit` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `video_file` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbnail` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `category` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `channel` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Courses`
--

INSERT INTO `Courses` (`id`, `title`, `description`, `benefit`, `video_file`, `thumbnail`, `status`, `category`, `channel`, `created_at`, `updated_at`) VALUES
('040792f7-9e65-4a5d-a13c-e24b847ee1f8', 'HTML Course1', 'สามารถเรียนได้อย่างสนุกสนาน ไม่น่าเบื่อ', 'คุณจะเก่งขึ้น', '1745394081459.mp4', '1745394081456.png', 0, '6123741e-9756-4796-8f00-38ea4ef3989f', '12aa4bea-6428-4877-810b-10ad9f325e8f', '2025-04-23 07:41:21.492', '2025-04-23 07:45:13.008'),
('2ebb2261-3664-4f8d-9cd6-33d9d4eec363', 'TypeScript Course2', 'สามารถเรียนได้อย่างสนุกสนาน ไม่น่าเบื่อ', 'คุณจะเก่งขึ้น', '1745069599192.mp4', '1745069599189.png', 0, 'c13284ec-1c7d-4870-bc0d-cf14d8e1016d', '12aa4bea-6428-4877-810b-10ad9f325e8f', '2025-04-19 13:33:19.231', '2025-04-19 13:36:15.908'),
('303b70bd-38f1-4343-8d10-37b1b1e5ae14', 'CSS Course', 'สามารถเรียนได้อย่างสนุกสนาน ไม่น่าเบื่อ', 'คุณจะเก่งขึ้น ถึงขั้นที่สามารถเอาไปตกแต่งหน้าเว็บจากเน่าๆกลายเป็นระดับสวยขั้นเทพได้เลย', '1744900284227.mp4', '1744900284225.png', 1, '53a778ad-756d-45bc-8819-5611ef6412e0', '12aa4bea-6428-4877-810b-10ad9f325e8f', '2025-04-17 14:31:24.260', '2025-04-19 13:24:58.038'),
('6ad36d40-3351-49d2-9b5b-c70aa366ad1f', 'React Native Course', 'สามารถเรียนได้อย่างสนุกสนาน ไม่น่าเบื่อ', 'คุณจะเก่งขึ้น', '1744900412358.mp4', '1744900412356.png', 1, 'c13284ec-1c7d-4870-bc0d-cf14d8e1016d', '12aa4bea-6428-4877-810b-10ad9f325e8f', '2025-04-17 14:33:32.392', '2025-04-17 14:33:32.392'),
('764f4b2c-90d8-48f5-ae5b-086197067a9e', 'React Native Course 2', 'สามารถเรียนได้อย่างสนุกสนาน ไม่น่าเบื่อ', 'คุณจะเก่งขึ้น', '1745069250881.mp4', '1745069250879.png', 0, 'c13284ec-1c7d-4870-bc0d-cf14d8e1016d', '12aa4bea-6428-4877-810b-10ad9f325e8f', '2025-04-19 13:27:30.918', '2025-04-19 13:32:59.614'),
('79a4ec4b-0d6c-4e4a-8048-3f155ce57233', 'React Course', 'สามารถเรียนได้อย่างสนุกสนาน ไม่น่าเบื่อ', 'คุณจะเก่งขึ้น', '1744900401663.mp4', '1744900401661.png', 1, '2fe9e44f-c6e0-490a-9e2e-54f0eeb14262', '12aa4bea-6428-4877-810b-10ad9f325e8f', '2025-04-17 14:33:21.694', '2025-04-17 14:33:21.694'),
('87e2332d-6be1-4254-b9b2-49e8f129168b', 'HTML Course2', 'สามารถเรียนได้อย่างสนุกสนาน ไม่น่าเบื่อ', 'คุณจะเก่งขึ้น', '1745394085027.mp4', '1745394085025.png', 0, '6123741e-9756-4796-8f00-38ea4ef3989f', '12aa4bea-6428-4877-810b-10ad9f325e8f', '2025-04-23 07:41:25.058', '2025-04-23 07:44:52.622'),
('925ba33e-6478-438b-a711-8cead3bd0406', 'HTML Course', 'สามารถเรียนได้อย่างสนุกสนาน ไม่น่าเบื่อ', 'คุณจะเก่งขึ้น', '1744900356183.mp4', '1744900356181.png', 0, '6123741e-9756-4796-8f00-38ea4ef3989f', '12aa4bea-6428-4877-810b-10ad9f325e8f', '2025-04-17 14:32:36.217', '2025-04-23 07:25:17.129'),
('95fe5a87-3e81-433f-82af-3c8a1d2b66d5', 'C++ Course', 'สามารถเรียนได้อย่างสนุกสนาน ไม่น่าเบื่อ', 'คุณจะเก่งขึ้น', '1744900319190.mp4', '1744900319187.png', 1, 'd0196510-50fc-496e-b1a8-86181fc16532', '12aa4bea-6428-4877-810b-10ad9f325e8f', '2025-04-17 14:31:59.223', '2025-04-17 14:31:59.223'),
('c68d8ae2-9bf7-4832-a6fc-4c39611bc144', 'TypeScript Course', 'สามารถเรียนได้อย่างสนุกสนาน ไม่น่าเบื่อ', 'คุณจะเก่งขึ้น', '1744900425613.mp4', '1744900425611.png', 1, '00c98e4b-c58c-4e7c-930d-942ee7b407cc', '12aa4bea-6428-4877-810b-10ad9f325e8f', '2025-04-17 14:33:45.648', '2025-04-17 14:33:45.648'),
('c886c7b5-8ee5-40a9-bdea-22f8a478b870', 'C# Course', 'สามารถเรียนได้อย่างสนุกสนาน ไม่น่าเบื่อ', 'คุณจะเก่งขึ้น', '1744900306481.mp4', '1744900306479.png', 1, '0236c0e0-349d-4fb9-a9e4-c8d84b501548', '12aa4bea-6428-4877-810b-10ad9f325e8f', '2025-04-17 14:31:46.518', '2025-04-17 14:31:46.518'),
('d69884ed-2975-4064-beb0-056a6f25010c', 'Flutter Course', 'สามารถเรียนได้อย่างสนุกสนาน ไม่น่าเบื่อ', 'คุณจะเก่งขึ้น', '1744900339680.mp4', '1744900339679.png', 1, '3ef92bbc-0fb4-461b-9154-d2c4dc8316ae', '12aa4bea-6428-4877-810b-10ad9f325e8f', '2025-04-17 14:32:19.711', '2025-04-17 14:32:19.711'),
('ebfc87e2-e999-4890-b771-c70f1898ebcc', 'JavaScript Course', 'สามารถเรียนได้อย่างสนุกสนาน ไม่น่าเบื่อ', 'คุณจะเก่งขึ้น', '1744900378586.mp4', '1744900378583.png', 1, '00d5fd0e-fa41-4a27-a1e7-a7d1cb032cd8', '12aa4bea-6428-4877-810b-10ad9f325e8f', '2025-04-17 14:32:58.638', '2025-04-17 14:32:58.638'),
('f2137c3b-9318-43a9-aa65-a83e4e6bce69', 'Python Course', 'สามารถเรียนได้อย่างสนุกสนาน ไม่น่าเบื่อ', 'คุณจะเก่งขึ้น', '1744900390482.mp4', '1744900390479.png', 1, '04a7e022-43f7-4f2a-bef5-2d4ec08785df', '12aa4bea-6428-4877-810b-10ad9f325e8f', '2025-04-17 14:33:10.517', '2025-04-17 14:33:10.517'),
('f43bc4fd-9c43-4a5d-bc6b-a50381308b17', 'TypeScript Course2', 'สามารถเรียนได้อย่างสนุกสนาน ไม่น่าเบื่อ', 'คุณจะเก่งขึ้น', '1745068072081.mp4', '1745068072078.png', 0, '00c98e4b-c58c-4e7c-930d-942ee7b407cc', '12aa4bea-6428-4877-810b-10ad9f325e8f', '2025-04-19 13:07:52.129', '2025-04-19 13:08:15.340');

-- --------------------------------------------------------

--
-- Table structure for table `Favorites`
--

CREATE TABLE `Favorites` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `channel` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `course` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Favorites`
--

INSERT INTO `Favorites` (`id`, `channel`, `course`, `created_at`) VALUES
('9add4262-3d91-4370-98c0-c29a195332bf', '41a5f000-50da-40c2-8eda-002acaa45063', '6ad36d40-3351-49d2-9b5b-c70aa366ad1f', '2025-04-23 03:15:04.915'),
('bbb7c276-b977-4627-9b1a-0b79a52bbfaa', '12aa4bea-6428-4877-810b-10ad9f325e8f', '303b70bd-38f1-4343-8d10-37b1b1e5ae14', '2025-04-17 15:00:25.400'),
('f3308e52-74ea-4e8e-bd8c-6de4ca4f54e3', '12aa4bea-6428-4877-810b-10ad9f325e8f', '6ad36d40-3351-49d2-9b5b-c70aa366ad1f', '2025-04-23 03:15:27.611');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `f_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `l_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `picture` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `f_name`, `l_name`, `picture`, `email`, `password`, `created_at`, `updated_at`) VALUES
('12aa4bea-6428-4877-810b-10ad9f325e8f', 'Warin ', 'Phromwaranon', '1745378435635.jpeg', 'warinpalm@gmail.com', '$2b$10$4dhy9Meiy6LXPN7e3R46Uuq1rlfAzTe4RSkfp4bJCX3M5n320hrcO', '2025-04-17 14:16:53.519', '2025-04-23 06:52:21.791'),
('13bf1caa-4b08-40d8-9f9c-ecb5c29ee05f', 'WebDev', 'Guide', '1745335976212.png', 'web@gmail.com', '$2b$10$h2qYUa.LW9ruy1aYccItquYWsz2I1xJiCY34x.kOuWp/cX/zQSXRO', '2025-04-22 15:14:38.764', '2025-04-22 15:32:56.296'),
('359f28d5-2190-4fe3-b4f5-9d8f9f885ce6', 'WebDev', 'Guide', '1745336077104.png', 'csharp@gmail.com', '$2b$10$YjQoaNeoER9ul1EvlHNcYO94jMRZVrp736PKy96WTsl5YmluimAMa', '2025-04-22 15:08:27.427', '2025-04-22 15:34:37.188'),
('41a5f000-50da-40c2-8eda-002acaa45063', 'WebDev', 'Guide', '1745336109071.png', 'typescript@gmail.com', '$2b$10$XEWQC9Nr5kAG119yHEBETehEgLukPXeP3lBiY6FoL02n1xHOB4g3.', '2025-04-22 15:04:21.075', '2025-04-22 15:35:09.157'),
('5a3c6c8e-fc65-4a7f-9a1d-6c2421313415', 'Warin', 'User2', NULL, 'warin2@gmail.com', '$2b$10$JMEY/kQX/SQiADncNhkL3eG1xjV/KRE2oFfZsdxlJWvGyOzpfJAR.', '2025-04-22 13:13:29.252', '2025-04-22 13:13:29.252'),
('642a1190-208b-460e-a1d7-5a360e17fa42', 'WebDev', 'Guide', '1745336005131.png', 'python@gmail.com', '$2b$10$ISfESoIucSsdkUgKMRxzmuL8RKnY4nm2aQhNaxSXbLUftT8Fon1BO', '2025-04-22 15:20:49.459', '2025-04-22 15:33:25.215'),
('8c2c9417-f3f1-4c25-af32-d4bd7eebfa14', 'WebDev', 'Guide', '1745336135958.png', 'react@gmail.com', '$2b$10$0iK4.nbSP6fpFXHUABUif.AYKThnHp4Vc1fYtBUrF/9oRktTcCXWy', '2025-04-22 15:18:35.528', '2025-04-22 15:35:36.042');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('684bbc14-13b6-4eb8-b4f7-6836e36ce343', '3fbc7a27bda8af2da4dad98fd0a6f3b53ad1980d9b861fc7b250928d6830e063', '2025-04-14 02:47:08.218', '20250414024708_coursesin', NULL, NULL, '2025-04-14 02:47:08.166', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Categories`
--
ALTER TABLE `Categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Categories_name_key` (`name`);

--
-- Indexes for table `Courses`
--
ALTER TABLE `Courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Courses_category_fkey` (`category`),
  ADD KEY `Courses_channel_fkey` (`channel`);

--
-- Indexes for table `Favorites`
--
ALTER TABLE `Favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Favorites_channel_fkey` (`channel`),
  ADD KEY `Favorites_course_fkey` (`course`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Users_email_key` (`email`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Courses`
--
ALTER TABLE `Courses`
  ADD CONSTRAINT `Courses_category_fkey` FOREIGN KEY (`category`) REFERENCES `Categories` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `Courses_channel_fkey` FOREIGN KEY (`channel`) REFERENCES `Users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `Favorites`
--
ALTER TABLE `Favorites`
  ADD CONSTRAINT `Favorites_channel_fkey` FOREIGN KEY (`channel`) REFERENCES `Users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `Favorites_course_fkey` FOREIGN KEY (`course`) REFERENCES `Courses` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
