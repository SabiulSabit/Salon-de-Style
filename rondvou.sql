-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 30, 2020 at 04:53 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rondvou`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `businessMail` varchar(40) NOT NULL,
  `userMail` varchar(40) NOT NULL,
  `userPhone` varchar(30) NOT NULL,
  `userAddress` varchar(100) NOT NULL,
  `serviceName` varchar(40) NOT NULL,
  `servicePrice` double NOT NULL,
  `day` date NOT NULL,
  `curDate` date NOT NULL,
  `timeSlotStart` time NOT NULL,
  `timeSlotEnd` time NOT NULL,
  `paymentType` varchar(20) NOT NULL,
  `status` int(11) NOT NULL,
  `bookingID` int(11) NOT NULL,
  `discount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`businessMail`, `userMail`, `userPhone`, `userAddress`, `serviceName`, `servicePrice`, `day`, `curDate`, `timeSlotStart`, `timeSlotEnd`, `paymentType`, `status`, `bookingID`, `discount`) VALUES
('iamsabit99@gmail.com', 'iamsabit99@gmail.com', '12345678', 'Dhaka, Bangladesh', 'Hair Cut', 123, '2020-10-15', '2020-10-17', '11:10:00', '11:40:00', 'Hand Cash', 1, 45680, 0),
('iamsabit99@gmail.com', 'iamsabit99@gmail.com', '12345678', 'Dhaka, Bangladesh', 'Hair Cut', 123, '2020-10-18', '2020-10-18', '16:30:00', '17:00:00', 'Hand Cash', 1, 45683, 0),
('iamsabit99@gmail.com', 'iamsabit99@gmail.com', '12345678', 'Dhaka, Bangladesh', 'Hair Cut', 123, '2020-10-18', '2020-10-18', '16:30:00', '17:00:00', 'Hand Cash', 1, 45685, 0),
('iamsabit99@gmail.com', 'iamsabit99@gmail.com', '12345678', 'Dhaka, Bangladesh', 'Hair Cut', 123, '2020-10-19', '2020-10-19', '01:05:00', '01:35:00', 'Hand Cash', 1, 45687, 0),
('iamsabit99@gmail.com', 'iamsabit99@gmail.com', '12345678', 'Dhaka, Bangladesh', 'Hair Cut', 123, '2020-10-27', '2020-10-27', '09:00:00', '09:30:00', 'Hand Cash', 0, 45689, 0),
('iamsabit99@gmail.com', 'iamsabit99@gmail.com', '12345678', 'Dhaka, Bangladesh', 'Hair Cut', 123, '2020-12-15', '2020-12-15', '10:00:00', '10:30:00', 'Hand Cash', 0, 45690, 0),
('iamsabit99@gmail.com', 'iamsabit99@gmail.com', '12345678', 'Dhaka, Bangladesh', 'Nail Cut', 22, '2020-10-08', '2020-10-08', '11:10:00', '11:40:00', 'Hand Cash', -1, 45681, 0),
('iamsabit99@gmail.com', 'iamsabit99@gmail.com', '12345678', 'Dhaka, Bangladesh', 'Nail Cut', 22, '2020-10-18', '2020-10-18', '16:30:00', '17:00:00', 'Hand Cash', 1, 45683, 0),
('iamsabit99@gmail.com', 'iamsabit99@gmail.com', '12345678', 'Dhaka, Bangladesh', 'Nail Cut', 22, '2020-10-18', '2020-10-18', '16:30:00', '17:00:00', 'Hand Cash', 0, 45685, 0),
('iamsabit99@gmail.com', 'iamsabit99@gmail.com', '12345678', 'Dhaka, Bangladesh', 'Nail Cut', 22, '2020-10-19', '2020-10-19', '01:05:00', '01:35:00', 'Hand Cash', 1, 45687, 0),
('iamsabit99@gmail.com', 'iamsabit99@gmail.com', '12345678', 'Dhaka, Bangladesh', 'Nail Put', 15, '2020-10-15', '2020-10-17', '11:10:00', '11:40:00', 'Hand Cash', 1, 45680, 0),
('iamsabit99@gmail.com', 'iamsabit99@gmail.com', '12345678', 'Dhaka, Bangladesh', 'Nail Put', 15, '2020-10-18', '2020-10-18', '17:30:00', '18:00:00', 'Hand Cash', 1, 45682, 0);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `name` varchar(20) NOT NULL,
  `businessMail` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`name`, `businessMail`) VALUES
('Abc', 'iamsabit99@gmail.com'),
('Hair Salon ', 'abc@gmail.com'),
('Nail Salon', 'iamsabit98@gmail.com'),
('Nail Salon', 'iamsabit99@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `name` varchar(40) NOT NULL,
  `useremail` varchar(40) NOT NULL,
  `shopMail` varchar(40) NOT NULL,
  `phone` int(11) NOT NULL,
  `address` varchar(100) NOT NULL,
  `discount` int(11) NOT NULL,
  `description` varchar(500) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`name`, `useremail`, `shopMail`, `phone`, `address`, `discount`, `description`, `id`) VALUES
('Sabiul Sabit', 'df9@gmail.com', 'iamsabit99@gmail.com', 1744248058, 'San Diago', 23, 'ds sd sdjf dfgsdf sdfg', 51001);

-- --------------------------------------------------------

--
-- Table structure for table `egiftcard`
--

CREATE TABLE `egiftcard` (
  `businessMail` varchar(40) NOT NULL,
  `giftCardName` varchar(35) NOT NULL,
  `description` varchar(100) NOT NULL,
  `price` double NOT NULL,
  `tax` double NOT NULL,
  `serviceName` varchar(30) NOT NULL,
  `endDate` date NOT NULL,
  `token` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `egiftcard`
--

INSERT INTO `egiftcard` (`businessMail`, `giftCardName`, `description`, `price`, `tax`, `serviceName`, `endDate`, `token`) VALUES
('abc@gmail.com', 'Eid', 'This is a free offer', 100, 0, 'Stylish Hair Cut', '2021-01-19', 45353),
('iamsabit99@gmail.com', 'OFFER', 'This is a free offer', 10, 10, 'Nail Cut', '2021-01-11', 45351),
('iamsabit99@gmail.com', 'OFFER1', 'This is a free offer', 100, 12, 'Nail Cut', '2021-01-12', 45352);

-- --------------------------------------------------------

--
-- Table structure for table `egiftcardorder`
--

CREATE TABLE `egiftcardorder` (
  `businessMail` varchar(40) NOT NULL,
  `userMail` varchar(40) NOT NULL,
  `friendMail` varchar(40) NOT NULL,
  `friendName` varchar(30) NOT NULL,
  `giftName` varchar(30) NOT NULL,
  `date` date NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `egiftcardorder`
--

INSERT INTO `egiftcardorder` (`businessMail`, `userMail`, `friendMail`, `friendName`, `giftName`, `date`, `status`) VALUES
('iamsabit99@gmail.com', 'iamsabit99@gmail.com', '', '', 'OFFER,OFFER', '2020-10-27', 0),
('iamsabit99@gmail.com', 'iamsabit99@gmail.com', '', '', 'OFFER1,OFFER1', '2020-10-27', 0);

-- --------------------------------------------------------

--
-- Table structure for table `healthandsafety`
--

CREATE TABLE `healthandsafety` (
  `businessMail` varchar(40) NOT NULL,
  `noWaitingArea` varchar(50) NOT NULL,
  `employeeWearMasks` varchar(50) NOT NULL,
  `employeesWearDisposableGloves` varchar(50) NOT NULL,
  `employeeTemperatureChecks` varchar(50) NOT NULL,
  `disinfectionBetweenClients` varchar(50) NOT NULL,
  `mustWareMask` varchar(50) NOT NULL,
  `disinfectionofallSurfacesintheVenue` varchar(50) NOT NULL,
  `maintainSocialDistancing` varchar(50) NOT NULL,
  `venueProvidesMasksforClients` varchar(50) NOT NULL,
  `clientTemperatureChecks` varchar(50) NOT NULL,
  `clientScreenings` varchar(50) NOT NULL,
  `barbicideCOVID_19Certified` varchar(50) NOT NULL,
  `contactlessPaymentAvailable` varchar(50) NOT NULL,
  `noInteractionsWithOtherClients` varchar(50) NOT NULL,
  `disposableSuppliesinUse` varchar(50) NOT NULL,
  `placetoWashHandsAvailable` varchar(50) NOT NULL,
  `masksAvailableforPurchase` varchar(50) NOT NULL,
  `timeGapBetweenAppointments` varchar(50) NOT NULL,
  `noWalk_ins` varchar(50) NOT NULL,
  `describeMore` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `healthandsafety`
--

INSERT INTO `healthandsafety` (`businessMail`, `noWaitingArea`, `employeeWearMasks`, `employeesWearDisposableGloves`, `employeeTemperatureChecks`, `disinfectionBetweenClients`, `mustWareMask`, `disinfectionofallSurfacesintheVenue`, `maintainSocialDistancing`, `venueProvidesMasksforClients`, `clientTemperatureChecks`, `clientScreenings`, `barbicideCOVID_19Certified`, `contactlessPaymentAvailable`, `noInteractionsWithOtherClients`, `disposableSuppliesinUse`, `placetoWashHandsAvailable`, `masksAvailableforPurchase`, `timeGapBetweenAppointments`, `noWalk_ins`, `describeMore`) VALUES
('abc@gmail.com', '', '', '', '', '', 'Must ware mask', '', '', '', '', '', 'Barbicide COVID-19 Certified', '', '', '', '', '', '', '', '                    \r\n                                            \r\n                  \r\n                      \r\n                  '),
('iamsabit99@gmail.com', 'No waiting area', 'Employee wear masks', '', '', '', 'Must ware mask', '', 'Maintain social distancing', '', '', 'Client screenings', '', '', '', '', '', '', '', 'No walk-ins', 'This is sabit');

-- --------------------------------------------------------

--
-- Table structure for table `membership`
--

CREATE TABLE `membership` (
  `businessMail` varchar(40) NOT NULL,
  `userName` varchar(30) NOT NULL,
  `userMail` varchar(40) NOT NULL,
  `price` int(11) NOT NULL,
  `tax` double NOT NULL,
  `service` varchar(30) NOT NULL,
  `endDate` date NOT NULL,
  `token` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `membership`
--

INSERT INTO `membership` (`businessMail`, `userName`, `userMail`, `price`, `tax`, `service`, `endDate`, `token`) VALUES
('iamsabit99@gmail.com', 'Sabiul Sabit', 'iamsabit99122@gmail.com', 23, 23, 'Nail Cut', '2020-10-15', 45352),
('iamsabit99@gmail.com', 'Sabiul Sabit', 'iamsabit99@gmail.com', 232, 232, 'Nail Cut', '2020-10-14', 45351);

-- --------------------------------------------------------

--
-- Table structure for table `package`
--

CREATE TABLE `package` (
  `businessMail` varchar(40) NOT NULL,
  `packageName` varchar(30) NOT NULL,
  `description` varchar(100) NOT NULL,
  `service` varchar(40) NOT NULL,
  `tax` double NOT NULL,
  `amount` int(11) NOT NULL,
  `price` double NOT NULL,
  `endDate` date NOT NULL,
  `token` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `package`
--

INSERT INTO `package` (`businessMail`, `packageName`, `description`, `service`, `tax`, `amount`, `price`, `endDate`, `token`) VALUES
('abc@gmail.com', 'Combo', 'This is a good package', 'Basic Hair Cut', 0, 2, 30, '2021-01-20', 45352),
('iamsabit99@gmail.com', 'PACK', 'This is a good package', 'Hair Cut', 5, 1, 232, '2021-01-12', 45351),
('iamsabit99@gmail.com', 'Pack-01', 'This is a good package', 'Nail Cut', 5, 45, 12, '2021-01-22', 45353);

-- --------------------------------------------------------

--
-- Table structure for table `packageorder`
--

CREATE TABLE `packageorder` (
  `packageToken` int(11) NOT NULL,
  `userMail` varchar(50) NOT NULL,
  `date` date NOT NULL,
  `tokenOrder` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `packageorder`
--

INSERT INTO `packageorder` (`packageToken`, `userMail`, `date`, `tokenOrder`, `status`) VALUES
(45353, 'iamsabit99@gmail.com', '2020-12-24', 2, 1),
(45351, 'iamsabit99@gmail.com', '2020-12-24', 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `businessMail` varchar(40) NOT NULL,
  `user` varchar(40) NOT NULL,
  `reports` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `report`
--

INSERT INTO `report` (`businessMail`, `user`, `reports`) VALUES
('abc@gmail.com', 'iamsabit99@gmail.com', 'Hateful or abusive content'),
('iamsabit99@gmail.com', 'iamsabit99@gmail.com', 'Harmful dangerous acts'),
('iamsabit99@gmail.com', 'iamsabit99@gmail.com', 'Hateful or abusive content');

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `businessMail` varchar(40) NOT NULL,
  `reviewrMail` varchar(40) NOT NULL,
  `reviewrName` varchar(30) NOT NULL,
  `reviewrDP` varchar(100) NOT NULL,
  `review` varchar(200) NOT NULL,
  `date` date NOT NULL,
  `rating` int(11) NOT NULL,
  `img` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`businessMail`, `reviewrMail`, `reviewrName`, `reviewrDP`, `review`, `date`, `rating`, `img`) VALUES
('iamsabit99@gmail.com', 'iamsabit99@gmail.com', 'Sabit 1', '/images/user/regUser/iamsabit99@gmail.com.png', 'This is a good shop', '2020-10-17', 4, '/images/user/review/iamsabit99@gmail.com.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `shopadmin`
--

CREATE TABLE `shopadmin` (
  `businessName` varchar(40) NOT NULL,
  `businessWebsite` varchar(30) NOT NULL,
  `ownerName` varchar(40) NOT NULL,
  `businessMail` varchar(40) NOT NULL,
  `businessNumber` varchar(15) NOT NULL,
  `password` varchar(500) NOT NULL,
  `img` varchar(50) NOT NULL,
  `img1` varchar(200) NOT NULL,
  `img2` varchar(200) NOT NULL,
  `img3` varchar(200) NOT NULL,
  `img4` varchar(200) NOT NULL,
  `ecom` varchar(50) NOT NULL,
  `fb` varchar(50) NOT NULL,
  `insta` varchar(50) NOT NULL,
  `officialName` varchar(50) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `address` varchar(150) NOT NULL,
  `lat` float NOT NULL,
  `lon` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shopadmin`
--

INSERT INTO `shopadmin` (`businessName`, `businessWebsite`, `ownerName`, `businessMail`, `businessNumber`, `password`, `img`, `img1`, `img2`, `img3`, `img4`, `ecom`, `fb`, `insta`, `officialName`, `description`, `address`, `lat`, `lon`) VALUES
('Cool Hairdresser', '', 'Sabiul Sabit', 'abc@gmail.com', '01744248058', '$2b$10$9DygGZMGodT1hB3RqUz34uF7fOVBcwp4Y2g8L.MksphlawqWSb.WG', '/images/shop/shopImg/abc.jpeg', '', '', '', '', '', '', '', '', '', '182 Bashundhara Rd, Dhaka, Bangladesh', 23.8136, 90.4235),
('sabit hair dress123', 'www.ad123.com', 'Sabit', 'iamsabit98@gmail.com', '12345', '$2b$10$ZnR6hxspC0guySJhjGMwE.yk4SSk3.T00V.NjcflOT7S08/CKz7wi', '/images/shop/shopImg/iamsabit98@gmail.com.jpeg', '', '', '', '', '', '', '', '', '', '', 0, 0),
('sabit hair dress', 'www.ad.com', 'sabit', 'iamsabit99@gmail.com', '123456', '$2b$10$YgzWXVxyt2or966pKCjxP.l6PjyrjTuhaUjruLz4YCImQbSUu44Ii', '/images/shop/shopImg/iamsabit99@gmail.comimg.jpeg', '/images/shop/shopImg/iamsabit99@gmail.comimg1.jpeg', '/images/shop/shopImg/iamsabit99@gmail.comimg2.png', '', '', 'ecom.com', 'fb.com', '', 'ABC', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'Dhaka 1205, Bangladesh', 23.7489, 90.4034);

-- --------------------------------------------------------

--
-- Table structure for table `shopinfo`
--

CREATE TABLE `shopinfo` (
  `businessMail` varchar(40) NOT NULL,
  `haircut` int(1) NOT NULL,
  `salon` int(1) NOT NULL,
  `nailCutter` int(1) NOT NULL,
  `beautySalon` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shopinfo`
--

INSERT INTO `shopinfo` (`businessMail`, `haircut`, `salon`, `nailCutter`, `beautySalon`) VALUES
('iamsabit98@gmail.com', 0, 1, 0, 1),
('iamsabit99@gmail.com', 1, 1, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `shopservice`
--

CREATE TABLE `shopservice` (
  `businessMail` varchar(40) NOT NULL,
  `name` varchar(25) NOT NULL,
  `hour` int(11) NOT NULL DEFAULT 0,
  `min` int(11) NOT NULL DEFAULT 0,
  `priceType` varchar(15) NOT NULL,
  `price` float NOT NULL,
  `category` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shopservice`
--

INSERT INTO `shopservice` (`businessMail`, `name`, `hour`, `min`, `priceType`, `price`, `category`) VALUES
('abc@gmail.com', 'Basic Hair Cut', 0, 30, 'Fixed', 10, 'Hair Salon'),
('abc@gmail.com', 'Stylish Hair Cut', 1, 30, 'Negotiable', 10, 'Hair Salon'),
('iamsabit99@gmail.com', 'Hair Cut', 1, 1, 'Dont', 123, 'Hair Salon'),
('iamsabit99@gmail.com', 'Nail Cut', 1, 1, 'Fixed', 22, 'Nail Salon'),
('iamsabit99@gmail.com', 'Nail Put', 2, 2, 'Fixed', 15, 'Nail Salon');

-- --------------------------------------------------------

--
-- Table structure for table `shoptime`
--

CREATE TABLE `shoptime` (
  `dayName` varchar(15) NOT NULL,
  `open` time NOT NULL,
  `close` time NOT NULL,
  `businessMail` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shoptime`
--

INSERT INTO `shoptime` (`dayName`, `open`, `close`, `businessMail`) VALUES
('fri', '10:00:00', '10:00:00', 'abc@gmail.com'),
('mon', '01:05:00', '12:10:00', 'iamsabit99@gmail.com'),
('sun', '10:00:00', '10:20:00', 'abc@gmail.com'),
('sun', '12:00:00', '12:40:00', 'iamsabit98@gmail.com'),
('sun', '16:00:00', '23:05:00', 'iamsabit99@gmail.com'),
('thu', '10:40:00', '18:45:00', 'iamsabit99@gmail.com'),
('thu', '12:35:00', '12:45:00', 'iamsabit98@gmail.com'),
('tue', '07:30:00', '17:20:00', 'iamsabit99@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `staffservices`
--

CREATE TABLE `staffservices` (
  `businessMail` varchar(40) NOT NULL,
  `staffMail` varchar(40) NOT NULL,
  `serviceName` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `staffservices`
--

INSERT INTO `staffservices` (`businessMail`, `staffMail`, `serviceName`) VALUES
('iamsabit99@gmail.com', 'abc@gmail.com', 'Nail Cut'),
('iamsabit99@gmail.com', 'hello@fmai.com', 'Hair Cut');

-- --------------------------------------------------------

--
-- Table structure for table `stafftime`
--

CREATE TABLE `stafftime` (
  `businessMail` varchar(40) NOT NULL,
  `mail` varchar(40) NOT NULL,
  `dayName` varchar(15) NOT NULL,
  `start` time NOT NULL,
  `end` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stafftime`
--

INSERT INTO `stafftime` (`businessMail`, `mail`, `dayName`, `start`, `end`) VALUES
('iamsabit99@gmail.com', 'abc@gmail.com', 'monday', '00:10:10', '02:00:10'),
('iamsabit99@gmail.com', 'abc@gmail.com', 'thrusday', '02:00:10', '08:00:11'),
('iamsabit99@gmail.com', 'abc@gmail.com', 'thrusday', '05:00:10', '04:00:12');

-- --------------------------------------------------------

--
-- Table structure for table `stuffinfo`
--

CREATE TABLE `stuffinfo` (
  `businessMail` varchar(40) NOT NULL,
  `stuffName` varchar(40) NOT NULL,
  `position` varchar(20) NOT NULL,
  `phone` int(15) NOT NULL,
  `email` varchar(40) NOT NULL,
  `img` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stuffinfo`
--

INSERT INTO `stuffinfo` (`businessMail`, `stuffName`, `position`, `phone`, `email`, `img`) VALUES
('iamsabit99@gmail.com', 'Sabit', 'Web Dev', 12345678, 'abc@gmail.com', '/images/shop/employee/abc@gmail.com.jpeg'),
('iamsabit99@gmail.com', 'Saidul', 'Web Dev Tev', 123, 'hello@fmai.com', '/images/shop/employee/hello@fmai.com.jpeg'),
('iamsabit98@gmail.com', 'staff', 'Hair', 12344, 'iamsabit99111@gmail.com', ''),
('abc@gmail.com', 'Sabit', 'Senior Dev', 1744248058, 'sabit@gmail.com', '/images/shop/employee/sabit@gmail.com.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `taxinfo`
--

CREATE TABLE `taxinfo` (
  `businessMail` varchar(40) NOT NULL,
  `companyName` varchar(50) NOT NULL,
  `taxID` varchar(50) NOT NULL,
  `invoicePrefix` varchar(50) NOT NULL,
  `correctionPrefix` varchar(50) NOT NULL,
  `prefixCashIn` varchar(50) NOT NULL,
  `prefixCashOut` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `postCode` varchar(50) NOT NULL,
  `bank` varchar(50) NOT NULL,
  `accountNumber` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `taxinfo`
--

INSERT INTO `taxinfo` (`businessMail`, `companyName`, `taxID`, `invoicePrefix`, `correctionPrefix`, `prefixCashIn`, `prefixCashOut`, `address`, `country`, `city`, `postCode`, `bank`, `accountNumber`) VALUES
('iamsabit99@gmail.com', '2', '2', '2', '2', '1', '1', '1', 'United State of America', '1', '1', '1', '1');

-- --------------------------------------------------------

--
-- Table structure for table `userinfo`
--

CREATE TABLE `userinfo` (
  `email` varchar(40) NOT NULL,
  `name` varchar(40) NOT NULL,
  `pass` varchar(500) NOT NULL,
  `address` varchar(100) NOT NULL,
  `img` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `fb` varchar(50) NOT NULL,
  `twitter` varchar(50) NOT NULL,
  `google` varchar(50) NOT NULL,
  `note` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userinfo`
--

INSERT INTO `userinfo` (`email`, `name`, `pass`, `address`, `img`, `phone`, `fb`, `twitter`, `google`, `note`) VALUES
('iamsabit99@gmail.com', 'Sabit 1', '$2b$10$MBbqMwEvVkPtwCgKH8C3ve1VJ06MIpdBD26k7kJqzLkbPk1.v74Ze', 'Dhaka, Bangladesh', '/images/user/regUser/iamsabit99@gmail.com.png', '12345678', '', '', '', 'Hello Sabit'),
('sabit@gmail.com', 'San Diago', '$2b$10$NROWAuETx/iAxSvogWQn0.rKj5aF4gsNI2POKUykdjUth/lMu.GNO', '108-A,Dhanmondi ,Dhaka', '/images/user/regUser/sabit@gmail.com.jpeg', '', '', '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`businessMail`,`userMail`,`serviceName`,`day`,`timeSlotStart`,`timeSlotEnd`,`bookingID`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`name`,`businessMail`),
  ADD KEY `b3Mail` (`businessMail`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`useremail`,`shopMail`,`id`),
  ADD KEY `c_shop` (`shopMail`);

--
-- Indexes for table `egiftcard`
--
ALTER TABLE `egiftcard`
  ADD PRIMARY KEY (`businessMail`,`giftCardName`);

--
-- Indexes for table `egiftcardorder`
--
ALTER TABLE `egiftcardorder`
  ADD PRIMARY KEY (`businessMail`,`userMail`,`friendMail`,`giftName`);

--
-- Indexes for table `healthandsafety`
--
ALTER TABLE `healthandsafety`
  ADD PRIMARY KEY (`businessMail`);

--
-- Indexes for table `membership`
--
ALTER TABLE `membership`
  ADD PRIMARY KEY (`businessMail`,`userMail`,`service`);

--
-- Indexes for table `package`
--
ALTER TABLE `package`
  ADD PRIMARY KEY (`businessMail`,`packageName`);

--
-- Indexes for table `packageorder`
--
ALTER TABLE `packageorder`
  ADD PRIMARY KEY (`tokenOrder`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`businessMail`,`user`,`reports`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`businessMail`,`reviewrMail`,`date`);

--
-- Indexes for table `shopadmin`
--
ALTER TABLE `shopadmin`
  ADD PRIMARY KEY (`businessMail`);

--
-- Indexes for table `shopinfo`
--
ALTER TABLE `shopinfo`
  ADD PRIMARY KEY (`businessMail`);

--
-- Indexes for table `shopservice`
--
ALTER TABLE `shopservice`
  ADD PRIMARY KEY (`businessMail`,`name`,`hour`,`min`);

--
-- Indexes for table `shoptime`
--
ALTER TABLE `shoptime`
  ADD PRIMARY KEY (`dayName`,`open`,`close`,`businessMail`),
  ADD KEY `b2Mail` (`businessMail`);

--
-- Indexes for table `staffservices`
--
ALTER TABLE `staffservices`
  ADD PRIMARY KEY (`businessMail`,`staffMail`);

--
-- Indexes for table `stafftime`
--
ALTER TABLE `stafftime`
  ADD PRIMARY KEY (`businessMail`,`mail`,`dayName`,`start`,`end`);

--
-- Indexes for table `stuffinfo`
--
ALTER TABLE `stuffinfo`
  ADD PRIMARY KEY (`email`),
  ADD KEY `bMail` (`businessMail`);

--
-- Indexes for table `taxinfo`
--
ALTER TABLE `taxinfo`
  ADD PRIMARY KEY (`businessMail`);

--
-- Indexes for table `userinfo`
--
ALTER TABLE `userinfo`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `packageorder`
--
ALTER TABLE `packageorder`
  MODIFY `tokenOrder` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `bk1` FOREIGN KEY (`businessMail`) REFERENCES `shopadmin` (`businessMail`);

--
-- Constraints for table `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `b3Mail` FOREIGN KEY (`businessMail`) REFERENCES `shopadmin` (`businessMail`);

--
-- Constraints for table `client`
--
ALTER TABLE `client`
  ADD CONSTRAINT `c_shop` FOREIGN KEY (`shopMail`) REFERENCES `shopadmin` (`businessMail`);

--
-- Constraints for table `healthandsafety`
--
ALTER TABLE `healthandsafety`
  ADD CONSTRAINT `hl1` FOREIGN KEY (`businessMail`) REFERENCES `shopadmin` (`businessMail`);

--
-- Constraints for table `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `rp1` FOREIGN KEY (`businessMail`) REFERENCES `shopadmin` (`businessMail`);

--
-- Constraints for table `shopinfo`
--
ALTER TABLE `shopinfo`
  ADD CONSTRAINT `b1Mail` FOREIGN KEY (`businessMail`) REFERENCES `shopadmin` (`businessMail`);

--
-- Constraints for table `shopservice`
--
ALTER TABLE `shopservice`
  ADD CONSTRAINT `b4Mail` FOREIGN KEY (`businessMail`) REFERENCES `shopadmin` (`businessMail`);

--
-- Constraints for table `shoptime`
--
ALTER TABLE `shoptime`
  ADD CONSTRAINT `b2Mail` FOREIGN KEY (`businessMail`) REFERENCES `shopadmin` (`businessMail`);

--
-- Constraints for table `staffservices`
--
ALTER TABLE `staffservices`
  ADD CONSTRAINT `staffUni` FOREIGN KEY (`businessMail`) REFERENCES `shopinfo` (`businessMail`);

--
-- Constraints for table `stafftime`
--
ALTER TABLE `stafftime`
  ADD CONSTRAINT `staffTimeIn` FOREIGN KEY (`businessMail`) REFERENCES `shopadmin` (`businessMail`);

--
-- Constraints for table `stuffinfo`
--
ALTER TABLE `stuffinfo`
  ADD CONSTRAINT `bMail` FOREIGN KEY (`businessMail`) REFERENCES `shopadmin` (`businessMail`);

--
-- Constraints for table `taxinfo`
--
ALTER TABLE `taxinfo`
  ADD CONSTRAINT `fk_05` FOREIGN KEY (`businessMail`) REFERENCES `shopadmin` (`businessMail`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
