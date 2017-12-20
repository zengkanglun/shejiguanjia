/*
SQLyog Ultimate v11.11 (64 bit)
MySQL - 5.6.36-log : Database - shejiguanjia
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`shejiguanjia` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `shejiguanjia`;

/*Table structure for table `s_action_log` */

DROP TABLE IF EXISTS `s_action_log`;

CREATE TABLE `s_action_log` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL COMMENT '会员ID',
  `log_info` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '操作内容',
  `log_ip` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '操作IP',
  `add_time` int(10) unsigned NOT NULL COMMENT '操作时间',
  `log_type` tinyint(4) NOT NULL COMMENT '操作类型 1/项目信息 2/过程管理 3/任务 4/通知 5/用户 6/管理 7/财务 8/后台',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=212 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `s_action_log` */

insert  into `s_action_log`(`id`,`user_id`,`log_info`,`log_ip`,`add_time`,`log_type`) values (1,1,'123','192.168.2.121',1508311943,1),(2,2,'周杰伦mmmm添加了发函记录','119.130.105.200',1508827179,2),(3,2,'人事修改了CEO的资料','119.130.105.200',1508828205,6),(4,2,'人事修改了CEO的资料','119.130.105.200',1508828274,6),(5,2,'人事修改了CEO的资料','119.130.105.200',1508828756,6),(6,2,'人事修改了CEO的资料','119.130.105.200',1508828818,6),(7,2,'人事修改了CEO的资料','119.130.105.200',1508828870,6),(8,2,'人事修改了CEO的资料','119.130.105.200',1508829065,6),(9,2,'人事修改了万科的资料','119.130.105.200',1508829092,6),(10,2,'人事修改了万科的资料','119.130.105.200',1508829104,6),(11,1,'李四添加了项目测试项目','58.62.204.245',1508830549,1),(12,1,'删除了他自己的任务test tile','58.62.204.245',1508831134,3),(13,1,'删除了他自己的任务test tile','58.62.204.245',1508831145,3),(14,1,'修改了自己的资料','58.62.204.245',1508832336,5),(15,2,'超级管理员删除了标题测试的任务','119.130.105.200',1508834513,8),(16,2,'超级管理员删除了标题测试的任务','119.130.105.200',1508834513,8),(17,2,'超级管理员删除了标题测试的任务','119.130.105.200',1508834513,8),(18,2,'超级管理员删除了111111的任务','119.130.105.200',1508834530,8),(19,1,'修改了自己的密码','58.62.204.245',1508835417,5),(20,1,'修改了自己的密码','58.62.204.245',1508835446,5),(21,1,'谢小明编辑了项目','58.62.204.245',1508835748,1),(22,1,'谢小明编辑了项目','58.62.204.245',1508835756,1),(23,2,'周杰伦mmmm添加了项目huicheng','119.130.105.200',1508836194,1),(24,1,'谢小明添加了项目testssss','119.130.105.200',1508836741,1),(25,1,'超级管理员新建了用户test','119.130.105.200',1508837063,8),(26,30,'test添加了项目cs','119.130.105.200',1508837817,1),(27,30,'test添加了过程纪要','119.130.105.200',1508839158,2),(28,30,'test添加了过程纪要','119.130.105.200',1508846045,2),(29,30,'test添加了项目test','119.130.105.200',1508846230,1),(30,32,'啊啊编辑了项目test','119.130.105.200',1508846435,1),(31,32,'啊啊编辑了项目','119.130.18.252',1508846463,1),(32,32,'创建了任务标题为:444,内容为测试','119.130.105.200',1508847229,3),(33,33,'创建了任务标题为:cs,内容为测试','119.130.105.200',1508847419,3),(34,2,'周杰伦mmmm编辑了项目huicheng','119.130.105.200',1508893258,1),(35,2,'周杰伦mmmm编辑了项目testssss','119.130.105.200',1508894231,1),(36,2,'周杰伦mmmm编辑了项目testssss','119.130.105.200',1508894757,1),(37,2,'周杰伦mmmm编辑了项目testssss','119.130.105.200',1508894770,1),(38,1,'超级管理员新建了用户一剑乘风去','119.130.105.179',1509174085,8),(39,34,'一剑乘风去添加了项目Rng','119.130.105.179',1509174614,1),(40,1,'超级管理员添加了用户角色类型','119.130.106.192',1509174814,8),(41,1,'超级管理员添加了工种类型','119.130.105.179',1509174885,8),(42,34,'新建了通知标题为sdasad,内容为asdsad','119.130.106.192',1509174900,4),(43,34,'新建了通知标题为aSda,内容为sadsadad','119.130.105.179',1509174924,4),(44,1,'超级管理员添加了工种类型','119.130.105.179',1509174930,8),(45,34,'新建了通知标题为aSdsa,内容为asdad','119.130.106.192',1509174935,4),(46,34,'新建了通知标题为asdad ,内容为sadadad','119.130.105.179',1509174971,4),(47,34,'新建了通知标题为sadad,内容为asd','119.130.106.192',1509174981,4),(48,34,'新建了通知标题为asdas ,内容为asdad','119.130.106.192',1509174995,4),(49,34,'新建了通知标题为asda ,内容为asda','119.130.106.192',1509175007,4),(50,34,'新建了通知标题为asda ,内容为asd','119.130.105.179',1509175022,4),(51,1,'超级管理员添加了过程纪要类型','119.130.106.192',1509175634,8),(52,1,'超级管理员添加了过程纪要类型','119.130.106.192',1509176400,8),(53,1,'超级管理员添加了发函管理类型','119.130.106.192',1509176420,8),(54,1,'超级管理员添加了图纸归档类型','119.130.105.179',1509176499,8),(55,1,'超级管理员添加了工种类型','119.130.105.179',1509176522,8),(56,1,'超级管理员添加了通知类型','119.130.105.179',1509176536,8),(57,1,'超级管理员添加了通知类型','119.130.106.192',1509176576,8),(58,1,'超级管理员添加了行政类型','119.130.105.179',1509176862,8),(59,34,'创建了任务标题为:54646,内容为546','119.130.106.192',1509176909,3),(60,1,'超级管理员添加了用户角色类型','119.130.105.179',1509177023,8),(61,1,'超级管理员添加了通知类型','119.130.105.179',1509177174,8),(62,1,'超级管理员添加了行政类型','119.130.106.192',1509177189,8),(63,1,'超级管理员添加了任务类型','119.130.105.179',1509177209,8),(64,1,'超级管理员添加了任务类型','119.130.105.179',1509177215,8),(65,1,'超级管理员添加了图纸归档类型','119.130.106.192',1509177267,8),(66,1,'超级管理员添加了图纸归档类型','119.130.106.192',1509177273,8),(67,1,'超级管理员添加了发函管理类型','119.130.105.179',1509177286,8),(68,1,'超级管理员添加了出图出差类型','119.130.106.192',1509177299,8),(69,1,'超级管理员添加了出图出差类型','119.130.105.179',1509177307,8),(70,1,'超级管理员添加了出图出差类型','119.130.105.179',1509177311,8),(71,1,'超级管理员添加了过程纪要类型','119.130.105.179',1509177347,8),(72,1,'超级管理员添加了建筑类型','119.130.106.192',1509177362,8),(73,1,'超级管理员添加了建筑类型','119.130.105.179',1509177371,8),(74,1,'超级管理员添加了工种类型','119.130.105.179',1509177397,8),(75,1,'超级管理员添加了工种类型','119.130.106.192',1509177401,8),(76,1,'超级管理员添加了过程纪要类型','119.130.105.179',1509177737,8),(77,1,'超级管理员添加了过程纪要类型','119.130.105.179',1509177762,8),(78,1,'超级管理员添加了过程纪要类型','119.130.106.192',1509177809,8),(79,1,'超级管理员添加了过程纪要类型','119.130.106.192',1509177825,8),(80,1,'超级管理员添加了过程纪要类型','119.130.105.179',1509177988,8),(81,1,'超级管理员添加了过程纪要类型','119.130.106.192',1509178066,8),(82,1,'超级管理员添加了过程纪要类型','119.130.106.192',1509178128,8),(83,1,'超级管理员添加了过程纪要类型','119.130.105.179',1509178148,8),(84,1,'超级管理员将CEO添加为管理层','119.130.105.179',1509178389,8),(85,1,'超级管理员更新了系统信息','119.130.105.179',1509178422,8),(86,1,'超级管理员新建了用户德芙','119.130.105.179',1509178537,8),(87,1,'超级管理员将李白添加为管理层','119.130.105.179',1509178593,8),(88,34,'修改了自己的密码','119.130.105.179',1509178711,5),(89,34,'修改了自己的密码','119.130.105.179',1509178741,5),(90,34,'修改了自己的资料','119.130.106.192',1509178777,5),(91,1,'超级管理员删除了12345555555555的任务','119.130.105.179',1509179842,8),(92,1,'删除了指派给他的任务test tile','119.130.105.179',1509180999,3),(93,1,'删除了指派给他的任务测试标题','119.130.106.192',1509181001,3),(94,1,'删除了他自己的任务测试标题','119.130.105.179',1509181007,3),(95,1,'删除了他自己的任务测试标题','119.130.106.192',1509181009,3),(96,1,'删除了他自己的任务测试标题','119.130.105.179',1509181010,3),(97,1,'超级管理员修改了达达的资料','61.140.229.168',1509289469,8),(98,1,'超级管理员修改了undefined的资料','61.140.229.168',1509290453,8),(99,1,'超级管理员修改了孙大发的资料','61.140.229.168',1509290741,8),(100,1,'超级管理员修改了45646的资料','61.140.229.168',1509290845,8),(101,1,'超级管理员修改了谢小明的资料','61.140.229.168',1509290927,8),(102,1,'超级管理员修改了45646的资料','61.140.229.168',1509290942,8),(103,1,'超级管理员修改了管理层周杰伦mmmms的资料','61.140.229.168',1509291397,8),(104,1,'超级管理员修改了管理层周杰伦m的资料','61.140.229.168',1509291480,8),(105,1,'超级管理员修改了管理层周杰伦m的资料','61.140.229.168',1509292303,8),(106,1,'超级管理员修改了管理层周杰伦m的资料','61.140.229.168',1509292319,8),(107,1,'超级管理员修改了管理层周杰伦ms的资料','61.140.229.168',1509292364,8),(108,1,'超级管理员修改了管理层周杰伦ms的资料','61.140.229.168',1509292481,8),(109,1,'超级管理员将李白添加为管理层','61.140.229.168',1509293019,8),(110,1,'超级管理员修改了管理层周杰伦ms的资料','61.140.229.168',1509293083,8),(111,1,'超级管理员修改了管理层wly555的资料','61.140.229.168',1509293092,8),(112,1,'超级管理员修改了管理层周杰伦ms的资料','61.140.229.168',1509293185,8),(113,1,'超级管理员修改了管理层周杰伦ms的资料','61.140.229.168',1509293199,8),(114,1,'超级管理员将张三添加为管理层','61.140.229.168',1509293221,8),(115,1,'超级管理员修改了管理层周杰伦的资料','61.140.229.168',1509293591,8),(116,1,'超级管理员修改了管理层周杰伦的资料','61.140.229.168',1509293803,8),(117,1,'超级管理员修改了管理层周杰伦的资料','61.140.229.168',1509293826,8),(118,1,'超级管理员修改了管理层周杰伦的资料','61.140.229.168',1509293859,8),(119,1,'超级管理员修改了管理层周杰伦的资料','61.140.229.168',1509293865,8),(120,1,'超级管理员修改了管理层周杰伦的资料','61.140.229.168',1509294016,8),(121,1,'超级管理员修改了管理层周杰伦的资料','61.140.229.168',1509294125,8),(122,1,'超级管理员修改了管理层周杰伦的资料','119.130.19.188',1509327441,8),(123,1,'超级管理员修改了管理层周杰伦的资料','119.130.19.188',1509327583,8),(124,1,'超级管理员修改了管理层周杰伦的资料','119.130.105.179',1509327679,8),(125,1,'超级管理员修改了管理层周杰伦的资料','119.130.19.188',1509327686,8),(126,1,'超级管理员修改了管理层周杰伦的资料','119.130.105.179',1509327810,8),(127,1,'超级管理员修改了管理层周杰伦的资料','119.130.105.179',1509327841,8),(128,1,'超级管理员修改了管理层周杰伦的资料','119.130.19.188',1509327907,8),(129,1,'超级管理员修改了管理层wly555的资料','119.130.19.188',1509327933,8),(130,1,'超级管理员添加了通知类型','119.130.105.179',1509332332,8),(131,1,'超级管理员添加了行政类型','119.130.105.179',1509332347,8),(132,34,'人事修改了CEO的资料','119.130.19.188',1509342179,6),(133,34,'人事修改了王璐遥的资料','119.130.105.179',1509342531,6),(134,34,'人事修改了sadasd的资料','119.130.19.188',1509342550,6),(135,34,'人事修改了万科的资料','119.130.105.179',1509342650,6),(136,34,'人事修改了一剑乘风去的资料','119.130.19.188',1509342882,6),(137,34,'一剑乘风去添加了项目飞飞','119.130.19.188',1509343468,1),(138,1,'超级管理员修改了管理层周杰伦的资料','119.130.19.188',1509353848,8),(139,1,'超级管理员修改了管理层周杰伦的资料','119.130.19.188',1509353853,8),(140,1,'超级管理员修改了管理层周杰伦的资料','119.130.19.188',1509356982,8),(141,1,'超级管理员修改了管理层周杰伦的资料','119.130.19.188',1509357120,8),(142,1,'超级管理员修改了管理层周杰伦的资料','119.130.19.188',1509357309,8),(143,1,'超级管理员修改了谢小明的资料','119.130.19.188',1509358180,8),(144,1,'超级管理员修改了谢小明的资料','119.130.19.188',1509358311,8),(145,1,'超级管理员修改了谢小明的资料','119.130.19.188',1509358334,8),(146,1,'超级管理员修改了管理层周杰伦的资料','119.130.19.188',1509358782,8),(147,1,'超级管理员修改了谢小明的资料','119.130.19.188',1509358936,8),(148,1,'超级管理员修改了管理层wly555的资料','119.130.19.188',1509359010,8),(149,1,'超级管理员修改了万科的资料','119.130.105.179',1509359328,8),(150,1,'超级管理员修改了谢小明的资料','61.140.229.168',1509373132,8),(151,1,'超级管理员修改了谢小明的资料','61.140.229.168',1509373311,8),(152,1,'超级管理员修改了CEO的资料','61.140.229.168',1509373897,8),(153,1,'超级管理员修改了谢小明的资料','61.140.229.168',1509374047,8),(154,1,'超级管理员修改了CEO的资料','61.140.229.168',1509374347,8),(155,1,'超级管理员修改了万科的资料','61.140.229.168',1509374374,8),(156,1,'超级管理员修改了万科的资料','61.140.229.168',1509374430,8),(157,1,'超级管理员修改了王璐瑶哈哈哈的资料','61.140.229.168',1509374658,8),(158,1,'超级管理员修改了谢小明的资料','61.140.229.168',1509375336,8),(159,1,'超级管理员修改了管理层周杰伦的资料','61.140.229.168',1509375445,8),(160,1,'超级管理员修改了管理层周杰伦的资料','61.140.229.168',1509375917,8),(161,1,'超级管理员修改了管理层周杰伦的资料','61.140.229.168',1509375944,8),(162,1,'超级管理员修改了管理层周杰伦的资料','61.140.229.168',1509376059,8),(163,1,'超级管理员修改了管理层周杰伦的资料','61.140.229.168',1509376091,8),(164,1,'超级管理员将CEO添加为管理层','61.140.229.168',1509376269,8),(165,1,'超级管理员将李白添加为管理层','61.140.229.168',1509376297,8),(166,1,'超级管理员修改了45646的资料','61.140.229.168',1509376513,8),(167,1,'超级管理员修改了王璐瑶哈哈哈的资料','61.140.229.168',1509376642,8),(168,1,'超级管理员修改了王璐瑶哈哈哈的资料','61.140.229.168',1509376713,8),(169,1,'超级管理员修改了管理层周杰伦的资料','61.140.229.168',1509376874,8),(170,1,'超级管理员修改了管理层wly555的资料','61.140.229.168',1509376905,8),(171,1,'超级管理员修改了管理层周杰伦的资料','61.140.229.168',1509376942,8),(172,1,'超级管理员修改了管理层周杰伦的资料','61.140.229.168',1509377017,8),(173,1,'超级管理员修改了管理层周杰伦的资料','61.140.229.168',1509377143,8),(174,1,'超级管理员修改了管理层周杰伦的资料','61.140.229.168',1509377222,8),(175,1,'超级管理员修改了管理层周杰伦的资料','61.140.229.168',1509377265,8),(176,1,'超级管理员修改了管理层周杰伦的资料','61.140.229.168',1509377304,8),(177,1,'超级管理员修改了管理层周杰伦的资料','61.140.229.168',1509377341,8),(178,1,'超级管理员修改了管理层周杰伦的资料','61.140.229.168',1509377374,8),(179,1,'超级管理员修改了管理层周杰伦的资料','61.140.229.168',1509377415,8),(180,1,'超级管理员修改了管理层周杰伦的资料','61.140.229.168',1509377429,8),(181,1,'超级管理员修改了管理层周杰伦的资料','61.140.229.168',1509377453,8),(182,1,'超级管理员修改了管理层周杰伦的资料','61.140.229.168',1509377487,8),(183,1,'超级管理员修改了王璐瑶哈哈哈的资料','61.140.229.168',1509377657,8),(184,1,'超级管理员修改了王璐瑶哈哈哈的资料','61.140.229.168',1509377751,8),(185,1,'超级管理员修改了管理层wly555的资料','61.140.229.168',1509377767,8),(186,1,'超级管理员修改了管理层wly555的资料','61.140.229.168',1509377850,8),(187,1,'超级管理员修改了管理层wly555的资料','61.140.229.168',1509377863,8),(188,1,'超级管理员修改了管理层周杰伦的资料','61.140.229.168',1509377882,8),(189,1,'超级管理员将CEO添加为管理层','61.140.229.168',1509377925,8),(190,1,'超级管理员将张三添加为管理层','61.140.229.168',1509378135,8),(191,1,'超级管理员修改了谢小明的资料','61.140.229.168',1509378969,8),(192,1,'超级管理员修改了管理层周杰伦的资料','61.140.229.168',1509379535,8),(193,1,'超级管理员修改了管理层周杰伦的资料','61.140.229.168',1509379551,8),(194,1,'超级管理员修改了谢小明的资料','61.140.229.168',1509379569,8),(195,1,'超级管理员修改了谢小明的资料','61.140.229.168',1509379579,8),(196,1,'超级管理员修改了45646的资料','61.140.229.168',1509379608,8),(197,1,'超级管理员修改了管理层周杰伦的资料','119.130.19.188',1509410975,8),(198,1,'超级管理员修改了谢小明的资料','119.130.19.188',1509410991,8),(199,1,'超级管理员修改了谢小明的资料','119.130.19.188',1509414308,8),(200,1,'超级管理员修改了孙大发的资料','119.130.19.188',1509414489,8),(201,1,'超级管理员修改了CEO的资料','119.130.105.179',1509414590,8),(202,1,'超级管理员修改了管理层周杰伦的资料','119.130.105.179',1509414740,8),(203,1,'超级管理员新建了用户JayChou','119.130.19.188',1509429528,8),(204,37,'JayChou添加了项目测试项目2333','119.130.105.179',1509429990,1),(205,37,'JayChou添加了项目65464','119.130.105.179',1509430541,1),(206,1,'超级管理员新建了用户asdasd1q2312','119.130.19.188',1509432954,8),(207,1,'超级管理员新建了用户wlyhhhh','119.130.105.179',1509433035,8),(208,39,'超级管理员新建了用户傻大个','119.130.105.179',1509433387,8),(209,39,'超级管理员将斯蒂芬添加为管理层','119.130.19.188',1509433661,8),(210,39,'wlyhhhh添加了项目城建地铁15号建设','119.130.18.73',1509436753,1),(211,39,'wlyhhhh添加了项目dsf','119.130.18.73',1509437031,1);

/*Table structure for table `s_archive_type` */

DROP TABLE IF EXISTS `s_archive_type`;

CREATE TABLE `s_archive_type` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL COMMENT '类型名称',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='图纸归档类型';

/*Data for the table `s_archive_type` */

insert  into `s_archive_type`(`id`,`name`) values (1,'归档！'),(2,'归档文档C类'),(3,'Archive'),(4,'归档！A$'),(5,'文件'),(6,'赊账'),(7,'不赊账');

/*Table structure for table `s_build_type` */

DROP TABLE IF EXISTS `s_build_type`;

CREATE TABLE `s_build_type` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL COMMENT '类型名字',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='建筑类型表';

/*Data for the table `s_build_type` */

insert  into `s_build_type`(`id`,`name`) values (1,'商铺'),(2,'公园'),(3,'写字楼'),(4,'住宅'),(6,'车库'),(7,'-'),(8,'水库');

/*Table structure for table `s_chuchai_type` */

DROP TABLE IF EXISTS `s_chuchai_type`;

CREATE TABLE `s_chuchai_type` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL COMMENT '类型名称',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=dec8 COMMENT='出差类型';

/*Data for the table `s_chuchai_type` */

insert  into `s_chuchai_type`(`id`,`name`) values (1,'ss'),(2,'@'),(3,'-o'),(4,'-o');

/*Table structure for table `s_executive` */

DROP TABLE IF EXISTS `s_executive`;

CREATE TABLE `s_executive` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL COMMENT '经手人ID',
  `executive_time` int(10) unsigned NOT NULL COMMENT '报账时间',
  `overhead_type_id` int(10) unsigned NOT NULL COMMENT '类型ID',
  `amount` decimal(12,2) NOT NULL COMMENT '金额',
  `executive_content` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '内容',
  `add_time` int(10) unsigned NOT NULL COMMENT '创建时间',
  `update_time` int(10) unsigned NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `s_executive` */

insert  into `s_executive`(`id`,`user_id`,`executive_time`,`overhead_type_id`,`amount`,`executive_content`,`add_time`,`update_time`) values (1,1,1507877473,2,110011.00,'内容！！！',1507973498,1507973597),(2,1,1507877473,2,110011.00,'内容！！！',1507973544,1507973544),(3,6,1509408000,6,55.00,'打印A4纸',1509434779,1509434779);

/*Table structure for table `s_expense` */

DROP TABLE IF EXISTS `s_expense`;

CREATE TABLE `s_expense` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(10) unsigned NOT NULL COMMENT '项目ID',
  `user_id` int(10) unsigned NOT NULL COMMENT '经手人ID',
  `overhead_type_id` int(10) unsigned NOT NULL COMMENT '报账类型',
  `amount` decimal(12,2) NOT NULL COMMENT '金额',
  `expense_time` int(10) unsigned NOT NULL COMMENT '报账时间',
  `expense_content` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '报账内容',
  `add_time` int(10) unsigned NOT NULL COMMENT '创建时间',
  `update_time` int(10) unsigned NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `s_expense` */

insert  into `s_expense`(`id`,`project_id`,`user_id`,`overhead_type_id`,`amount`,`expense_time`,`expense_content`,`add_time`,`update_time`) values (1,1,1,2,6666.00,1507877473,'内容！！！',1507959577,1507959577),(2,1,1,2,7890.00,1507877473,'内容！！！',1507959652,1507959702),(3,2,1,2,1100.00,1507877473,'内容！！！',1507959810,1507967729),(4,8,19,2,100.00,1507507200,'购置办公桌椅',1509434500,1509434500),(5,3,1,1,500.00,1508803200,'饭店消费',1509435183,1509435183);

/*Table structure for table `s_info` */

DROP TABLE IF EXISTS `s_info`;

CREATE TABLE `s_info` (
  `name` varchar(100) DEFAULT NULL COMMENT '单位名称',
  `mobile` varchar(20) DEFAULT NULL COMMENT '单位电话',
  `address` varchar(255) DEFAULT NULL COMMENT '单位信息',
  `zipcode` varchar(10) DEFAULT NULL COMMENT '邮政编码',
  `email` varchar(50) DEFAULT NULL COMMENT '单位邮箱',
  `max_upload_size` int(10) DEFAULT '3145728' COMMENT '最大文件上传限制 单位字节'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='单位信息表';

/*Data for the table `s_info` */

insert  into `s_info`(`name`,`mobile`,`address`,`zipcode`,`email`,`max_upload_size`) values ('','','','','',31480);

/*Table structure for table `s_letter` */

DROP TABLE IF EXISTS `s_letter`;

CREATE TABLE `s_letter` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL COMMENT '类型',
  `filename` varchar(255) NOT NULL COMMENT '文件原名',
  `file` varchar(255) NOT NULL COMMENT '文件路径',
  `content` varchar(255) NOT NULL COMMENT '事由',
  `user_id` int(11) NOT NULL COMMENT '发布人ID',
  `time` int(11) NOT NULL COMMENT '时间',
  `add_time` int(11) NOT NULL COMMENT '添加时间',
  `update_time` int(11) NOT NULL COMMENT '更新时间',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态 0正常 1删除',
  `project_id` int(11) NOT NULL COMMENT '项目ID',
  `dele_time` int(11) NOT NULL DEFAULT '0' COMMENT '删除时间',
  `data_type` int(11) NOT NULL DEFAULT '1' COMMENT '数据类型 1 是发函管理 2是图纸归档',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COMMENT='发函管理';

/*Data for the table `s_letter` */

insert  into `s_letter`(`id`,`type`,`filename`,`file`,`content`,`user_id`,`time`,`add_time`,`update_time`,`status`,`project_id`,`dele_time`,`data_type`) values (1,1,'ofo.txt','/Uploads/contract/./2017-10-17/96r985q015q55.txt','测试修改',1,1508256000,1508256000,1508234601,1,1,0,1),(2,2,'马上嗨微信公众号.txt','/Uploads/contract/./2017-10-17/6899r55qrq8sn.txt','测试发函',1,1508256000,1508239757,1508239757,0,1,0,2),(3,2,'3ce0d3325e60251c04889327e541b828.png','/Uploads/contract/./2017-10-18/p6rq5200on595.png','测试发函',1,1508256000,1508297485,1508297485,0,1,0,1),(4,1,'006iFrXTgy1fjr7xxjztuj31jk2bc1l0.jpg','/Uploads/contract/./2017-10-18/0q75p679n95ro.jpg','坎坎坷坷',1,1508256000,1508314473,1508314473,0,1,0,1),(5,1,'006iFrXTgy1fjr7xxjztuj31jk2bc1l0.jpg','/Uploads/contract/./2017-10-18/1orn7pq599ro1.jpg','张召忠',1,1508860800,1508315598,1508315598,0,1,0,1),(6,4,'006iFrXTgy1fjr7y2ttohj31jk2bd1l1.jpg','/Uploads/contract/./2017-10-18/r152r35o197s1.jpg','张召忠',1,1508256000,1508315889,1508315889,0,1,0,2),(7,2,'QQ图片20171020095552.jpg','/Uploads/contract/./2017-10-24/59640r03oro2r.jpg','asdasdasd',2,1496937600,1508827179,1508827179,0,1,0,2);

/*Table structure for table `s_letter_type` */

DROP TABLE IF EXISTS `s_letter_type`;

CREATE TABLE `s_letter_type` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL COMMENT '类型名称',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='发函管理类型';

/*Data for the table `s_letter_type` */

insert  into `s_letter_type`(`id`,`name`) values (1,'信函C'),(2,'发函'),(3,'电子信件'),(4,'-');

/*Table structure for table `s_lock_status` */

DROP TABLE IF EXISTS `s_lock_status`;

CREATE TABLE `s_lock_status` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(10) NOT NULL COMMENT 's_user id',
  `status` enum('1','2') DEFAULT '1' COMMENT '是否锁屏 1否 2是',
  `expire_time` int(10) DEFAULT '0' COMMENT '过期时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='锁屏状态记录表';

/*Data for the table `s_lock_status` */

insert  into `s_lock_status`(`id`,`uid`,`status`,`expire_time`) values (1,1,'2',1509096543),(3,2,'1',1509095837),(4,30,'1',1509104970);

/*Table structure for table `s_migrations` */

DROP TABLE IF EXISTS `s_migrations`;

CREATE TABLE `s_migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `s_migrations` */

insert  into `s_migrations`(`id`,`migration`,`batch`) values (1,'2017_10_11_070944_create_user_table',1),(2,'2017_10_11_071021_create_action_log_table',1),(3,'2017_10_11_075626_create_project_table',1),(4,'2017_10_11_081738_create_project_child_table',1),(5,'2017_10_11_082222_create_project_child_work_type_table',1),(6,'2017_10_11_090059_create_work_talbe',1),(7,'2017_10_11_090138_create_schedule_table',1),(8,'2017_10_11_182237_create_receipt_table',1),(9,'2017_10_11_182328_create_task_table',1),(10,'2017_10_12_093853_create_staff_table',1),(11,'2017_10_14_101222_create_expense_table',2),(12,'2017_10_14_102031_create_executive_table',2),(16,'2017_10_14_161657_create_project_commission_table',3),(17,'2017_10_14_161747_create_project_work_commission_table',3),(18,'2017_10_14_161828_create_project_staff_commission_table',3);

/*Table structure for table `s_notice` */

DROP TABLE IF EXISTS `s_notice`;

CREATE TABLE `s_notice` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` mediumint(8) NOT NULL COMMENT '类型',
  `project_id` int(10) NOT NULL COMMENT '项目id 对应project',
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '标题',
  `file` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '附件路径',
  `file_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '附件原始文件名',
  `content` text COLLATE utf8_unicode_ci COMMENT '内容',
  `user_id` int(10) NOT NULL COMMENT '发起人',
  `receiver` int(10) NOT NULL COMMENT '接收者',
  `addtime` int(10) DEFAULT '0' COMMENT '发起时间',
  `reply` text COLLATE utf8_unicode_ci COMMENT '回复内容',
  `status` tinyint(1) DEFAULT '0' COMMENT '0/正常 1/删除',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='通知表';

/*Data for the table `s_notice` */

insert  into `s_notice`(`id`,`type`,`project_id`,`title`,`file`,`file_name`,`content`,`user_id`,`receiver`,`addtime`,`reply`,`status`) values (7,1,2,'标题测试','/Uploads/notice/2017-10-18/93442650qr009.png','default','内容测试',1,1,1508298755,'123456781234567',0),(19,1,27,'【催促】你有未完成的计提任务',NULL,NULL,'你有未完成的计提任务，请查看。',34,34,1509435273,NULL,0),(9,1,1,'来自wangluyao的','C:\\fakepath\\c9d52eb5.ini','','跑1000M',1,14,1508309379,'',0),(11,1,1,'sdasad','/Uploads/notice/2017-10-28/1734929rs5245.png','about_icon_60x60','asdsad',34,1,1509174900,NULL,0),(12,1,1,'aSda',NULL,NULL,'sadsadad',34,34,1509174924,NULL,0),(13,1,1,'aSdsa',NULL,NULL,'asdad',34,34,1509174935,NULL,0),(14,1,1,'asdad ','/Uploads/notice/2017-10-28/6q154r9o3qos2.png','arrow_icon_24x29','sadadad',34,34,1509174971,'sadad',0),(15,1,1,'sadad','/Uploads/notice/2017-10-28/58q49s5nrpn25.png','arrow_icon_80x90','asd',34,34,1509174981,NULL,0),(16,3,6,'asdas ','/Uploads/notice/2017-10-28/3927q979sr5q4.png','arrow_icon_80x90','asdad',34,26,1509174995,NULL,0),(17,1,1,'asda ','/Uploads/notice/2017-10-28/5r23qs74s9270.png','back_icon_38x38','asda',34,34,1509175007,NULL,0),(18,1,1,'asda ','/Uploads/notice/2017-10-28/r8o947srpr52r.png','Collection_icon_100x100','asd',34,34,1509175022,NULL,0),(20,1,27,'【催促】你有未完成的计提任务',NULL,NULL,'你有未完成的计提任务，请查看。',34,34,1509435347,NULL,0),(21,1,27,'【催促】你有未完成的计提任务',NULL,NULL,'你有未完成的计提任务，请查看。',34,34,1509435449,NULL,0),(22,1,1,'【通知】项目发起了计提任务',NULL,NULL,'你有新的计提任务，请查看。',6,2,1509438321,NULL,0),(23,1,1,'【催促】你有未完成的计提任务',NULL,NULL,'你有未完成的计提任务，请查看。',6,2,1509438347,NULL,0);

/*Table structure for table `s_notice_receive` */

DROP TABLE IF EXISTS `s_notice_receive`;

CREATE TABLE `s_notice_receive` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(10) NOT NULL COMMENT '通知接收者id',
  `pid` int(10) NOT NULL COMMENT '对应通知表id',
  `addtime` int(10) DEFAULT '0',
  `status` tinyint(1) DEFAULT '1' COMMENT '1/未接收 2/已读 3/已回复 4/软删除',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

/*Data for the table `s_notice_receive` */

insert  into `s_notice_receive`(`id`,`uid`,`pid`,`addtime`,`status`) values (7,1,7,1508298755,3),(19,34,19,1509435273,1),(9,14,9,1508309379,1),(11,1,11,1509174900,2),(12,34,12,1509174924,2),(13,34,13,1509174935,2),(14,34,14,1509174971,3),(15,34,15,1509174981,2),(16,26,16,1509174995,1),(17,34,17,1509175007,1),(18,34,18,1509175022,2),(20,34,20,1509435347,1),(21,34,21,1509435449,1),(22,2,22,1509438321,1),(23,2,23,1509438347,1);

/*Table structure for table `s_notice_type` */

DROP TABLE IF EXISTS `s_notice_type`;

CREATE TABLE `s_notice_type` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL COMMENT '类型名称',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='通知类型表';

/*Data for the table `s_notice_type` */

insert  into `s_notice_type`(`id`,`name`) values (1,'通知类型1'),(2,'通知类型2'),(3,'的'),(4,'一个角色');

/*Table structure for table `s_overhead_type` */

DROP TABLE IF EXISTS `s_overhead_type`;

CREATE TABLE `s_overhead_type` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL COMMENT '类型名称',
  `type` tinyint(1) DEFAULT NULL COMMENT '1/项目支出 2/行政支出',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='支出类型表';

/*Data for the table `s_overhead_type` */

insert  into `s_overhead_type`(`id`,`name`,`type`) values (1,'test',1),(2,'ook',1),(3,'ccav',1),(4,'十九大',2),(5,'我爱中国',2),(6,'小学生',2);

/*Table structure for table `s_picture` */

DROP TABLE IF EXISTS `s_picture`;

CREATE TABLE `s_picture` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `participate` int(10) NOT NULL COMMENT '参与人ID',
  `type` int(10) NOT NULL COMMENT '类型',
  `num` int(10) NOT NULL COMMENT '数量',
  `content` varchar(255) NOT NULL COMMENT '内容',
  `user_id` int(11) NOT NULL COMMENT '发布人ID',
  `add_time` int(11) NOT NULL COMMENT '添加时间',
  `update_time` int(11) NOT NULL COMMENT '更新时间',
  `project_id` int(11) NOT NULL COMMENT '项目ID',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态 0整除 1删除',
  `dele_time` int(11) NOT NULL DEFAULT '0' COMMENT '删除时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COMMENT='出图出差';

/*Data for the table `s_picture` */

insert  into `s_picture`(`id`,`participate`,`type`,`num`,`content`,`user_id`,`add_time`,`update_time`,`project_id`,`status`,`dele_time`) values (1,2,1,2,'出差记录',1,1508220748,1508225061,1,0,0),(2,2,1,2,'出差记录2',1,1508309801,1508309801,1,0,0),(3,2,1,2,'出差记录3',1,1508310016,1508310016,1,0,0),(4,1,1,4,'撒莎莎',1,1508310185,1508310185,1,0,0),(5,1,1,3,'张召忠',1,1508315463,1508315463,1,0,0);

/*Table structure for table `s_process` */

DROP TABLE IF EXISTS `s_process`;

CREATE TABLE `s_process` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `type` int(11) NOT NULL COMMENT '类型',
  `time` int(11) NOT NULL COMMENT '时间',
  `update_time` int(11) NOT NULL COMMENT '更新时间',
  `add_time` int(11) NOT NULL COMMENT '添加时间',
  `content` varchar(255) NOT NULL COMMENT '内容',
  `project_id` int(11) NOT NULL COMMENT '项目ID',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态 0正常 1删除',
  `dele_time` int(11) NOT NULL DEFAULT '0' COMMENT '删除时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COMMENT='过程纪要';

/*Data for the table `s_process` */

insert  into `s_process`(`id`,`user_id`,`type`,`time`,`update_time`,`add_time`,`content`,`project_id`,`status`,`dele_time`) values (1,1,3,1486051200,1486051200,1486051200,'sed',1,1,1508241279),(2,1,3,1486051200,1486051200,1486051200,'sed',1,0,0),(3,2,2,1486051200,1486051200,0,'s',1,0,0),(4,2,3,1486051200,1486051200,0,'s',1,0,0),(5,2,2,1486051200,1486051200,1486051200,'sed',1,1,0),(6,2,1,1486051200,1486051200,1486051200,'sed666666666666666666666666666',1,1,0),(7,3,1,1486051200,1486051200,0,'1234567890-',1,1,0),(8,3,1,1510243200,1508307263,1508307263,'测试添加过程',1,0,0),(9,3,1,0,1508307473,1508307473,'测试添加过程',1,0,0),(10,3,1,1508256000,1508307509,1508307509,'啥快递卡三级地',1,0,0),(11,1,1,1508256000,1508321575,1508307529,'重中之重做做改改',1,0,0),(12,5,3,1508256000,1508307600,1508307600,'啥啥啥啥啥啥',1,0,0),(13,5,3,1508256000,1508307629,1508307629,'啦啦啦啦',1,0,0),(14,1,1,0,1508309460,1508309460,'来啊啊来了',1,0,0),(15,7,1,0,1508309484,1508309484,'时代峰峻开会水电费计划啥的',1,0,0),(16,7,1,0,1508309684,1508309684,'点点滴滴',1,0,0),(17,7,1,0,1508309884,1508309884,'电饭锅',1,0,0),(18,7,1,0,1508310061,1508310061,'多撒多所所多所多所多所多所多',1,0,0),(19,1,1,1508256000,1508321487,1508315439,'张召忠改改改',1,0,0),(20,30,1,1486051200,1508839158,1508839158,'11111',0,0,0),(21,30,1,1506960000,1508846045,1508846045,'啊啊啊',0,0,0);

/*Table structure for table `s_process_type` */

DROP TABLE IF EXISTS `s_process_type`;

CREATE TABLE `s_process_type` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL COMMENT '类型名称',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COMMENT='过程纪要类型表';

/*Data for the table `s_process_type` */

insert  into `s_process_type`(`id`,`name`) values (1,'过程管理'),(2,'j'),(3,'过程-标准'),(4,'vip!'),(5,'j'),(6,'sfd'),(7,'d'),(8,'CMMI'),(9,''),(10,''),(11,'CMMI'),(12,'j'),(13,'过程'),(14,'过程M');

/*Table structure for table `s_project` */

DROP TABLE IF EXISTS `s_project`;

CREATE TABLE `s_project` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `number` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '项目编号',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '项目名称',
  `project_time` int(10) unsigned NOT NULL COMMENT '立项时间',
  `province` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '省份',
  `city` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '城市',
  `building_type` int(10) unsigned NOT NULL COMMENT '建筑类型ID',
  `stage` int(10) unsigned NOT NULL COMMENT '阶段类型ID',
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '项目地址',
  `filename` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '合同文件原文件名',
  `file` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '项目合同文件',
  `build` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '建设单位',
  `tel` char(11) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '(建设单位)联系电话',
  `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '电子邮箱',
  `contact_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '联系地址',
  `supervisor` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '(建设单位)项目主管',
  `supervisor_tel` char(11) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '(建设单位)项目主管联系电话',
  `director_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '项目主管ID',
  `money` float(11,2) NOT NULL DEFAULT '0.00' COMMENT '合同总额',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态 0进行中 1是完结 2是中断',
  `sche_id` int(10) NOT NULL DEFAULT '0' COMMENT '项目进度ID',
  `add_time` int(10) unsigned NOT NULL COMMENT '创建时间',
  `update_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `user_id` int(10) NOT NULL DEFAULT '0' COMMENT '项目创建者ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `s_project` */

insert  into `s_project`(`id`,`number`,`name`,`project_time`,`province`,`city`,`building_type`,`stage`,`address`,`filename`,`file`,`build`,`tel`,`email`,`contact_address`,`supervisor`,`supervisor_tel`,`director_id`,`money`,`status`,`sche_id`,`add_time`,`update_time`,`user_id`) values (1,'HZ201710126842','天空之城',1507773600,'广东','广州',1,1,'广州某个地方 测试','设计管家数据字典.xlsx','/Uploads/contract/./2017-10-12/rrs7o5r2qnq9o.xlsx','广州一建','18819171134','1293719114@qq.com','广州某个地方','陈主管','18819171134','6',1000011.00,0,2,1507780399,1508835756,1),(2,'HZ201710126842','天空之城',1507773600,'广东','广州',1,1,'维权撒多','complete_icon_220x220.png','/Uploads/contract/./2017-10-17/6p2rpr560p695.png','朋友，别走','13330114238','123sad@qq.com','123','123王企鹅','13330114238','1',200.00,0,3,1507865659,1508235886,1),(3,'HZ2017101268421','天空之城112',1507946400,'广东','广州',1,1,'广州某个地方','','','广州一建','18819171134','1293719114@qq.com','广州某个地方','陈主管','18819171134','1',1000000.00,0,5,1507865678,1507865678,1),(4,'HZ2017101268421','高楼大厦',1507946400,'广东','广州',1,1,'广州某个地方','','','广州一建','18819171134','1293719114@qq.com','广州某个地方','陈主管','18819171134','1',1000000.00,1,7,1507865736,1507865736,1),(5,'HZ2017101268421','高楼大厦666',1507946400,'广东','广州',1,1,'广州某个地方','','','广州一建','18819171134','1293719114@qq.com','广州某个地方','陈主管','18819171134','1',1000000.00,1,9,1507865743,1507865743,1),(6,'5+4','789789',1507046400,'江西省','吉安市',0,1,'7897897','','','78978','789879','57781@qq.com','78979','87979','789879','1',42645.00,0,0,1508115019,1508115019,1),(7,'5+4','789789',1507046400,'江西省','吉安市',0,1,'7897897','','','78978','789879','57781@qq.com','78979','87979','789879','1',42645.00,0,0,1508115022,1508115022,1),(8,'5+4','789789',1507046400,'江西省','吉安市',0,1,'7897897','','','78978','789879','57781@qq.com','78979','87979','789879','1',42645.00,0,0,1508115028,1508115028,1),(9,'5+4','789789',1507046400,'江西省','吉安市',0,1,'7897897','','','78978','789879','57781@qq.co','78979','87979','789879','1',42645.00,0,0,1508115066,1508115066,1),(10,'5+4','789789',1507046400,'江西省','吉安市',0,1,'7897897','','','78978','789879','57781@qq.co','78979','87979','789879','1',42645.00,0,0,1508115072,1508115072,1),(11,'10086','创建项目测试',1508083200,'黑龙江省','双鸭山市',0,1,'珠江新城','','','阿达','18819400405','1333qw.@qq.com','珠江新城','李','18819400405','1',1000.00,0,0,1508120138,1508120138,1),(12,'1325465','54645646565',1508256000,'广东省','广州市',0,1,'珠江岸边','','','山谷','13330114238','57781@qq.com','saudauiosauo','米子','13330114238','1',120.22,0,0,1508206763,1508206763,1),(13,'13310086','焰分噬浪尺',1507651200,'安徽省','亳州市',0,1,'天上人间','','','建设中心','13330114238','15632@qq.com','133330114238','猛踩','18819400405','6',50.00,1,30,1508219416,1509434273,1),(14,'ewr','werewrwerwr',1508342400,'内蒙古','乌海市',0,1,'werwrwr','','','werwr','13330144238','156@qq.com','qewq','ewrwrw','13330114238','11',4154.00,0,0,1508221132,1508221132,1),(15,'ewr','werewrwerwr',1508342400,'内蒙古','乌海市',0,1,'werwrwr','','','werwr','13330144238','156@qq.com','qewq','ewrwrw','13330114238','11',4154.00,0,0,1508221165,1508221165,1),(16,'ewr','werewrwerwr',1508342400,'内蒙古','乌海市',0,1,'werwrwr','','','werwr','13330144238','15sa6@qq.com','qewq','ewrwrw','13330114238','11',4154.00,0,0,1508221195,1508221195,1),(17,'ewr','werewrwerwr',1508342400,'内蒙古','乌海市',0,1,'werwrwr','','','werwr','13330144238','15sa6@qq.com','qewq','ewrwrw','13330114238','11',4154.00,0,0,1508221218,1508221218,1),(18,'libai007','静夜思',1507651200,'浙江省','绍兴市',1,1,'asda','activity_150x150.png','/Uploads/contract/./2017-10-17/505r4p0p24q9s.png','asdadad','13330114238','sada@qq.com','152544684','asdsa','13330114238','1',10.22,0,0,1508233005,1508233005,1),(19,'libai007','静夜思',1507651200,'浙江省','绍兴市',1,1,'asda','activity_150x150.png','/Uploads/contract/./2017-10-17/p558q0qr95493.png','asdadad','13330114238','sada@qq.com','152544684','asdsa','13330114238','1',10.22,0,0,1508233348,1508233348,1),(20,'asdadada','asdad',1507651200,'安徽省','淮北市',1,1,'asdada','activity_150x150.png','/Uploads/contract/./2017-10-17/0965qpr5q1rs1.png','asdadad','13330114238','122@qq.com','1asadsa','asdad','18845872951','1',100.00,0,0,1508233414,1508233414,1),(21,'111111','测试项目',1508774400,'undefined','undefined',1,1,'广州','','','不会吧','','111@qq.com','广州','小明','','6',111.00,0,0,1508830549,1508830549,1),(22,'yanque','huicheng',1507046400,'江西省','新余市',3,3,'赛博坦','about _shijia_profile photo_150x150.png','/Uploads/contract/./2017-10-25/n9252r2955r4s.png','asdsa','18819400405','1564@qq.com','asdad','asdad','13665479513','2',3000.00,0,0,1508836194,1508893258,2),(23,'123456','testssss',1508774400,'广东省','广州市',4,3,'广州市','','','1sadasd','13800138000','qq@qq.com','1111122','2','13800138000','1',200.00,1,0,1508836741,1508894770,1),(24,'001','cs',1508774400,'广东省','广州市',1,1,'天河','t01d4506bee2715bebf.jpg','/Uploads/contract/./2017-10-24/8o9s59109q3r3.jpg','111','13111111111','70888888@qq.com','天河','222','13222222222','6',100000.00,0,0,1508837817,1508837817,30),(25,'002','test',1508688000,'广东省','广州市',1,1,'天河客运站','t01d4506bee2715bebf.jpg','/Uploads/contract/./2017-10-24/on5s9o9r2n456.jpg','333','13444444444','78888888@q.com','天河','33','13555555555','32',200.00,0,0,1508846230,1508846435,30),(26,'加油吧！','Rng',1509120000,'江西省','新余市',3,3,'上海','','','撒大大','45657879823','45654@qq.com','145465','驱蚊器二','13330114238','2',0.00,1,0,1509174614,1509174614,34),(27,'no231','飞飞',1507651200,'维吾尔','塔城地区',3,4,'啊实打实','','','啊实打实','13330114238','577815@qq.com',' 飒飒 撒旦啊','撒旦','13330114235','34',0.00,0,0,1509343468,1509343468,34),(28,'Number2333','测试项目2333',1509379200,'广东省','广州市',3,1,'项目地址2333测试','','','单位测试','18646985412','465456asd@qq.com','联系地址测试','主管测试','18635412984','37',0.00,0,0,1509429990,1509429990,37),(29,'4654654','65464',1509379200,'广东省','广州市',1,1,'a65d465as4d','','','a465sd465asd','13659847135','6a5s4d65a4s@qq.com','as65d465as4d56','as65d4a6s5d4','13658474123','1',0.00,0,0,1509430541,1509430541,37),(30,'DSGS','城建地铁15号建设',1514563200,'广东省','广州市',3,2,'天河北388号','','','第二城建','14754745635','14754745635@163.com','广州环市西路37','某总','13346574343','6',0.00,0,0,1509436753,1509436753,39),(31,'dfdsa','dsf',1509379200,'浙江省','衢州市',1,3,'address: lxdkfsjldg','','','sf','121351','121351@163.com','sdgsdgsd','fsd','132532','40',0.00,0,0,1509437031,1509437031,39);

/*Table structure for table `s_project_child` */

DROP TABLE IF EXISTS `s_project_child`;

CREATE TABLE `s_project_child` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '子项目名称',
  `project_id` int(10) unsigned NOT NULL COMMENT '项目ID',
  `add_time` int(10) unsigned NOT NULL COMMENT '创建时间',
  `update_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `s_project_child` */

insert  into `s_project_child`(`id`,`name`,`project_id`,`add_time`,`update_time`) values (1,'地基',1,1507791941,1507791941),(2,'亭台楼阁',1,1507791942,1507791942),(3,'测试',2,1507890336,1507890336),(4,'子项58',12,1508212462,1508212462),(5,'子项36',12,1508212462,1508212462),(6,'子项98',12,1508212783,1508212783),(7,'子项68',12,1508212783,1508212783),(8,'子项98',12,1508212822,1508212822),(9,'子项68',12,1508212822,1508212822),(10,'子项98',12,1508212883,1508212883),(11,'子项68',12,1508212883,1508212883),(12,'天涯何处无芳草',13,1508219723,1508219723),(13,'枝上柳绵吹又少',13,1508219723,1508219723),(14,'子项目一',10,1508220235,1508220235),(15,'子项目一',10,1508220235,1508220235),(16,'子项目一',15,1508220353,1508220353),(17,'子项目一',15,1508220376,1508220376),(18,'子项目一',15,1508220414,1508220414),(19,'子项目一',10,1508220461,1508220461),(20,'子项目一',10,1508220953,1508220953),(21,'子项目一2',10,1508220953,1508220953),(22,'子项1223',17,1508221260,1508221260),(23,'子项1223',17,1508221267,1508221267),(24,'子项目一23',20,1508233768,1508233768),(25,'子项目一3',20,1508233768,1508233768),(26,'子项目一',21,1508830561,1508830561),(27,'q',22,1508836221,1508836221),(28,'w',22,1508836221,1508836221),(29,'第一号楼',23,1508836800,1508836800),(30,'bo1',26,1509174674,1509174674),(31,'bo2',26,1509174674,1509174674),(32,'diyi',27,1509343511,1509343511),(33,'03',27,1509343511,1509343511),(34,'新建子项目',29,1509430555,1509430555),(35,'新建子项目',30,1509436763,1509436763),(36,'新建子项目1',31,1509437121,1509437121);

/*Table structure for table `s_project_child_work_type` */

DROP TABLE IF EXISTS `s_project_child_work_type`;

CREATE TABLE `s_project_child_work_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `work_id` int(10) unsigned NOT NULL COMMENT '工种ID',
  `user_id` int(10) unsigned NOT NULL COMMENT '用户（负责人）ID',
  `project_child_id` int(10) unsigned NOT NULL COMMENT '子项目ID',
  `add_time` int(10) unsigned NOT NULL COMMENT '创建时间',
  `update_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=187 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `s_project_child_work_type` */

insert  into `s_project_child_work_type`(`id`,`work_id`,`user_id`,`project_child_id`,`add_time`,`update_time`) values (1,9,3,2,1507791941,1508142014),(2,2,3,1,1507791942,1507791942),(3,1,2,1,1507791942,1507791942),(4,8,4,2,1507791942,1508142014),(5,1,0,3,1507890336,1507890336),(6,2,3,3,1507890336,1507890336),(7,1,0,4,1508212462,1508212462),(8,2,0,4,1508212462,1508212462),(9,3,0,4,1508212462,1508212462),(10,4,0,4,1508212462,1508212462),(11,5,0,4,1508212462,1508212462),(12,6,0,4,1508212462,1508212462),(13,7,0,4,1508212462,1508212462),(14,1,0,6,1508212783,1508212783),(15,2,0,6,1508212783,1508212783),(16,3,0,6,1508212783,1508212783),(17,4,0,6,1508212783,1508212783),(18,5,0,6,1508212783,1508212783),(19,6,0,6,1508212783,1508212783),(20,7,0,6,1508212783,1508212783),(21,1,0,8,1508212822,1508212822),(22,2,0,8,1508212822,1508212822),(23,3,0,8,1508212822,1508212822),(24,4,0,8,1508212822,1508212822),(25,5,0,8,1508212822,1508212822),(26,6,0,8,1508212822,1508212822),(27,7,0,8,1508212822,1508212822),(28,1,0,10,1508212883,1508212883),(29,2,0,10,1508212883,1508212883),(30,3,0,10,1508212883,1508212883),(31,4,0,10,1508212883,1508212883),(32,5,0,10,1508212883,1508212883),(33,6,0,10,1508212883,1508212883),(34,7,0,10,1508212883,1508212883),(35,1,0,12,1508219723,1508219723),(36,2,0,12,1508219723,1508219723),(37,3,0,12,1508219723,1508219723),(38,4,0,12,1508219723,1508219723),(39,5,0,12,1508219723,1508219723),(40,6,0,12,1508219723,1508219723),(41,7,0,12,1508219723,1508219723),(42,1,0,13,1508219723,1508219723),(43,2,0,13,1508219723,1508219723),(44,3,0,13,1508219723,1508219723),(45,4,0,13,1508219723,1508219723),(46,5,0,13,1508219723,1508219723),(47,6,0,13,1508219723,1508219723),(48,7,0,13,1508219723,1508219723),(49,1,0,14,1508220235,1508220235),(50,2,0,14,1508220235,1508220235),(51,3,0,14,1508220235,1508220235),(52,4,0,14,1508220235,1508220235),(53,5,0,14,1508220235,1508220235),(54,6,0,14,1508220235,1508220235),(55,7,0,14,1508220235,1508220235),(56,1,0,15,1508220235,1508220235),(57,2,0,15,1508220235,1508220235),(58,3,0,15,1508220235,1508220235),(59,4,0,15,1508220235,1508220235),(60,5,0,15,1508220235,1508220235),(61,6,0,15,1508220235,1508220235),(62,7,0,15,1508220235,1508220235),(63,1,10,20,1508220953,1508220953),(64,2,0,20,1508220953,1508220953),(65,3,0,20,1508220953,1508220953),(66,4,0,20,1508220953,1508220953),(67,5,0,20,1508220953,1508220953),(68,6,0,20,1508220953,1508220953),(69,7,0,20,1508220953,1508220953),(70,1,10,21,1508220953,1508220953),(71,2,0,21,1508220953,1508220953),(72,3,0,21,1508220953,1508220953),(73,4,0,21,1508220953,1508220953),(74,5,0,21,1508220953,1508220953),(75,6,0,21,1508220953,1508220953),(76,7,0,21,1508220953,1508220953),(77,1,2,22,1508221260,1508221260),(78,2,0,22,1508221260,1508221260),(79,3,0,22,1508221260,1508221260),(80,4,0,22,1508221260,1508221260),(81,5,6,22,1508221260,1508221260),(82,6,7,22,1508221260,1508221260),(83,7,0,22,1508221260,1508221260),(84,1,2,23,1508221267,1508221267),(85,2,0,23,1508221267,1508221267),(86,3,0,23,1508221267,1508221267),(87,4,0,23,1508221267,1508221267),(88,5,6,23,1508221267,1508221267),(89,6,7,23,1508221267,1508221267),(90,7,0,23,1508221267,1508221267),(91,1,0,24,1508233768,1508233768),(92,2,0,24,1508233768,1508233768),(93,3,0,24,1508233768,1508233768),(94,4,0,24,1508233768,1508233768),(95,5,0,24,1508233768,1508233768),(96,6,0,24,1508233768,1508233768),(97,7,0,24,1508233768,1508233768),(98,1,0,25,1508233768,1508233768),(99,2,0,25,1508233768,1508233768),(100,3,0,25,1508233768,1508233768),(101,4,0,25,1508233768,1508233768),(102,5,0,25,1508233768,1508233768),(103,6,0,25,1508233768,1508233768),(104,7,0,25,1508233768,1508233768),(105,1,16,26,1508830561,1508835756),(106,2,0,26,1508830561,1508835756),(107,3,0,26,1508830561,1508835756),(108,4,0,26,1508830561,1508835756),(109,5,0,26,1508830561,1508835756),(110,6,0,26,1508830561,1508835756),(111,7,0,26,1508830561,1508835756),(112,1,0,27,1508836221,1508836221),(113,2,0,27,1508836221,1508836221),(114,3,0,27,1508836221,1508836221),(115,4,0,27,1508836221,1508836221),(116,5,0,27,1508836221,1508836221),(117,6,0,27,1508836221,1508836221),(118,7,0,27,1508836221,1508836221),(119,9,6,27,1508836221,1508836221),(120,1,0,28,1508836221,1508836221),(121,2,7,28,1508836221,1508836221),(122,3,0,28,1508836221,1508836221),(123,4,0,28,1508836221,1508836221),(124,5,0,28,1508836221,1508836221),(125,6,0,28,1508836221,1508836221),(126,7,0,28,1508836221,1508836221),(127,1,2,29,1508836800,1508836800),(128,2,6,29,1508836800,1508836800),(129,3,24,29,1508836800,1508836800),(130,4,13,29,1508836800,1508836800),(131,5,3,29,1508836800,1508836800),(132,6,0,29,1508836800,1508836800),(133,7,0,29,1508836800,1508836800),(134,1,34,30,1509174674,1509174674),(135,2,27,30,1509174674,1509174674),(136,3,28,30,1509174674,1509174674),(137,4,2,30,1509174674,1509174674),(138,5,2,30,1509174674,1509174674),(139,6,30,30,1509174674,1509174674),(140,7,29,30,1509174674,1509174674),(141,1,0,31,1509174674,1509174674),(142,2,28,31,1509174674,1509174674),(143,3,0,31,1509174674,1509174674),(144,4,31,31,1509174674,1509174674),(145,5,30,31,1509174674,1509174674),(146,6,0,31,1509174674,1509174674),(147,7,34,31,1509174674,1509174674),(148,9,30,31,1509174674,1509174674),(149,12,28,31,1509174674,1509174674),(150,1,34,32,1509343511,1509343511),(151,2,30,32,1509343511,1509343511),(152,3,34,32,1509343511,1509343511),(153,4,0,32,1509343511,1509343511),(154,5,32,32,1509343511,1509343511),(155,6,0,32,1509343511,1509343511),(156,7,0,32,1509343511,1509343511),(157,1,34,33,1509343511,1509343511),(158,2,0,33,1509343511,1509343511),(159,3,0,33,1509343511,1509343511),(160,4,35,33,1509343511,1509343511),(161,5,0,33,1509343511,1509343511),(162,6,0,33,1509343511,1509343511),(163,7,0,33,1509343511,1509343511),(164,18,32,33,1509343511,1509343511),(165,13,30,33,1509343511,1509343511),(166,1,37,34,1509430555,1509430555),(167,2,37,34,1509430555,1509430555),(168,3,37,34,1509430555,1509430555),(169,4,37,34,1509430555,1509430555),(170,5,0,34,1509430555,1509430555),(171,6,0,34,1509430555,1509430555),(172,7,0,34,1509430555,1509430555),(173,1,0,35,1509436763,1509436763),(174,2,0,35,1509436763,1509436763),(175,3,0,35,1509436763,1509436763),(176,4,0,35,1509436763,1509436763),(177,5,0,35,1509436763,1509436763),(178,6,0,35,1509436763,1509436763),(179,7,0,35,1509436763,1509436763),(180,1,26,36,1509437121,1509437121),(181,2,32,36,1509437121,1509437121),(182,3,6,36,1509437121,1509437121),(183,4,16,36,1509437121,1509437121),(184,5,19,36,1509437121,1509437121),(185,6,38,36,1509437121,1509437121),(186,7,5,36,1509437121,1509437121);

/*Table structure for table `s_project_commission` */

DROP TABLE IF EXISTS `s_project_commission`;

CREATE TABLE `s_project_commission` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(10) unsigned NOT NULL COMMENT '项目ID',
  `project_child_id` int(10) unsigned NOT NULL COMMENT '子项目ID',
  `supervisor_id` int(10) unsigned NOT NULL COMMENT '主管ID',
  `supervisor_rate` double(12,2) NOT NULL DEFAULT '0.00' COMMENT '主管计提比例',
  `supervisor_money` double(12,2) NOT NULL DEFAULT '0.00' COMMENT '主管获得计提金额',
  `group_rate` double(12,2) NOT NULL DEFAULT '0.00' COMMENT '项目组计提比例',
  `amount` double(12,2) NOT NULL DEFAULT '0.00' COMMENT '计提总金额',
  `start_time` int(10) unsigned NOT NULL COMMENT '计提开始时间',
  `end_time` int(10) unsigned NOT NULL COMMENT '计提结束时间',
  `is_submit` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '审核状态：0-待提交，1-已提交',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '状态：0-待审核，1-已审核，2-审核不通过',
  `is_finish` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '完成状态：0-未完成，1-已完成',
  `add_time` int(10) unsigned NOT NULL COMMENT '创建时间',
  `update_time` int(10) unsigned NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `s_project_commission` */

insert  into `s_project_commission`(`id`,`project_id`,`project_child_id`,`supervisor_id`,`supervisor_rate`,`supervisor_money`,`group_rate`,`amount`,`start_time`,`end_time`,`is_submit`,`status`,`is_finish`,`add_time`,`update_time`) values (1,1,1,6,0.00,0.00,0.00,0.00,1508220079,1508220094,0,0,0,1509434303,1509434303),(2,27,32,34,0.00,0.00,0.00,0.00,2017,2017,0,0,0,1509435290,1509435290);

/*Table structure for table `s_project_staff_commission` */

DROP TABLE IF EXISTS `s_project_staff_commission`;

CREATE TABLE `s_project_staff_commission` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(10) unsigned NOT NULL COMMENT '项目ID',
  `project_child_id` int(10) unsigned NOT NULL COMMENT '子项目ID',
  `project_commission_id` int(10) unsigned NOT NULL COMMENT '计提基本信息表ID',
  `work_id` int(10) unsigned NOT NULL COMMENT '工种ID',
  `user_id` int(10) unsigned NOT NULL COMMENT '员工ID',
  `commission_rate` double(12,2) NOT NULL DEFAULT '0.00' COMMENT '员工计提比例',
  `commission_money` double(12,2) NOT NULL DEFAULT '0.00' COMMENT '员工获得计提金额',
  `labor` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '分工情况',
  `content` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '工作内容',
  `add_time` int(10) unsigned NOT NULL COMMENT '创建时间',
  `update_time` int(10) unsigned NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `s_project_staff_commission` */

insert  into `s_project_staff_commission`(`id`,`project_id`,`project_child_id`,`project_commission_id`,`work_id`,`user_id`,`commission_rate`,`commission_money`,`labor`,`content`,`add_time`,`update_time`) values (1,1,1,1,1,4,0.00,0.00,'测试分工','修改工作内容',1509434303,1509434303),(2,1,1,1,1,3,0.00,0.00,'测试分工2','',1509434303,1509434303),(3,1,1,1,1,2,0.00,0.00,'asdd','',1509434303,1509434303),(4,27,32,2,1,2,0.00,0.00,'5446','',1509435290,1509435290),(5,27,32,2,1,6,0.00,0.00,'sadsa','',1509435290,1509435290),(6,27,32,2,1,1,0.00,0.00,'sadad','',1509435290,1509435290),(7,27,32,2,1,2,0.00,0.00,'adsd','',1509435290,1509435290),(8,27,32,2,1,6,0.00,0.00,'1','',1509435290,1509435290),(9,27,32,2,1,1,0.00,0.00,'456','',1509435290,1509435290),(10,27,32,2,1,6,0.00,0.00,'sadsa7','',1509435290,1509435290),(11,27,32,2,1,16,0.00,0.00,'1','',1509435290,1509435290),(12,27,32,2,1,1,0.00,0.00,'sdf','',1509435290,1509435290),(13,27,32,2,1,14,0.00,0.00,'2','',1509435290,1509435290),(14,27,32,2,1,1,0.00,0.00,'xiexiaom','',1509435290,1509435290),(15,27,32,2,1,5,0.00,0.00,'78','',1509435290,1509435290),(16,27,32,2,1,1,0.00,0.00,'445','',1509435290,1509435290),(17,27,32,2,1,7,0.00,0.00,'213','',1509435290,1509435290),(18,27,32,2,1,2,0.00,0.00,'546','',1509435290,1509435290),(19,27,32,2,1,16,0.00,0.00,'3','',1509435290,1509435290),(20,27,32,2,3,1,0.00,0.00,'sadad0','',1509435290,1509435290),(21,27,32,2,3,4,0.00,0.00,'fds0','',1509435290,1509435290),(22,27,32,2,3,6,0.00,0.00,'sd','',1509435290,1509435290),(23,27,32,2,3,3,0.00,0.00,'dsfsdf','',1509435290,1509435290),(24,27,32,2,1,6,0.00,0.00,'as','',1509435290,1509435290),(25,27,32,2,1,16,0.00,0.00,'12','',1509435290,1509435290),(26,27,32,2,3,37,0.00,0.00,'123','',1509435290,1509435290);

/*Table structure for table `s_project_work_commission` */

DROP TABLE IF EXISTS `s_project_work_commission`;

CREATE TABLE `s_project_work_commission` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(10) unsigned NOT NULL COMMENT '项目ID',
  `project_child_id` int(10) unsigned NOT NULL COMMENT '子项目ID',
  `project_commission_id` int(10) unsigned NOT NULL COMMENT '计提基本信息表ID',
  `work_id` int(10) unsigned NOT NULL COMMENT '工种ID',
  `user_id` int(10) unsigned NOT NULL COMMENT '工程负责人ID',
  `commission_rate` double(12,2) NOT NULL DEFAULT '0.00' COMMENT '工种计提比例',
  `commission_money` double(12,2) NOT NULL DEFAULT '0.00' COMMENT '工种计提金额',
  `is_submit` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '提交状态：0-待提交，1-已提交',
  `status` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '状态：0-待审核，1-已审核，2-审核不通过',
  `add_time` int(10) unsigned NOT NULL COMMENT '创建时间',
  `update_time` int(10) unsigned NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `s_project_work_commission` */

insert  into `s_project_work_commission`(`id`,`project_id`,`project_child_id`,`project_commission_id`,`work_id`,`user_id`,`commission_rate`,`commission_money`,`is_submit`,`status`,`add_time`,`update_time`) values (1,1,1,1,1,2,50.00,0.00,0,0,1509434303,1509434303),(2,1,1,1,2,3,50.00,0.00,0,0,1509434303,1509434303),(3,27,32,2,1,34,0.00,0.00,0,0,1509435290,1509435290),(4,27,32,2,2,30,0.00,0.00,0,0,1509435290,1509435290),(5,27,32,2,3,34,0.00,0.00,0,0,1509435290,1509435290),(6,27,32,2,5,32,0.00,0.00,0,0,1509435290,1509435290);

/*Table structure for table `s_receipt` */

DROP TABLE IF EXISTS `s_receipt`;

CREATE TABLE `s_receipt` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `receive` decimal(12,2) NOT NULL COMMENT '收款金额',
  `cause` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '事由',
  `receive_time` int(10) unsigned NOT NULL COMMENT '收款时间',
  `s_id` int(10) unsigned NOT NULL COMMENT '项目进度阶段ID',
  `add_time` int(10) unsigned NOT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `s_receipt` */

insert  into `s_receipt`(`id`,`receive`,`cause`,`receive_time`,`s_id`,`add_time`) values (1,10000.00,'高利收款！！',1507877473,1,1507879923),(2,6000.00,'高利收款！！!!!!',1507877474,1,1507880104),(3,2333.00,'高利收款！！!!!!',1507877476,1,1507880114),(4,2333.00,'高利收款！！!!!!',1507877478,1,1507880117),(5,2333.00,'高利收款！！!!!!',1507877479,1,1507880117),(6,2333.00,'高利收款！！!!!!',1507877474,1,1507880118),(7,2333.00,'高利收款！！!!!!',1507877411,1,1507880119),(8,2333.00,'高利收款！！!!!!',1507877454,1,1507880119),(9,2333.00,'高利收款！！!!!!',1507877479,1,1507880120),(10,2333.00,'高利收款！！!!!!',1507877473,1,1507880121),(11,1.00,'高利收款！！!!!!',1507877473,1,1507880295),(12,85335.00,'高利收款！！!!!!',1507877473,1,1507880316),(13,0.00,'高利收款！！!!!!',1507877473,1,1507880323),(14,0.00,'高利收款！！!!!!',1507877473,1,1507880475),(15,0.00,'高利收款！！!!!!',1507877473,2,1507880991),(16,10000.00,'高利收款！！!!!!',1507877473,2,1507881235),(17,100000.00,'高利收款！！!!!!',1507877473,2,1507881239),(18,10000.00,'高利收款！！!!!!',1507877473,2,1507881249),(19,10000.00,'高利收款！！!!!!',1507877473,2,1507881249),(20,10000.00,'高利收款！！!!!!',1507877473,2,1507881250),(21,10000.00,'高利收款！！!!!!',1507877473,2,1507881250),(22,10000.00,'高利收款！！!!!!',1507877473,2,1507881251),(23,10000.00,'高利收款！！!!!!',1507877473,2,1507881251),(24,10000.00,'高利收款！！!!!!',1507877473,2,1507881252),(25,10000.00,'高利收款！！!!!!',1507877473,2,1507881252),(26,10000.00,'高利收款！！!!!!',1507877473,2,1507881309),(27,1000.00,'高利收款！！!!!!',1507877473,3,1507882636),(28,5.00,'收到张三5rem',1509408000,27,1509431242),(29,10.00,'收到50rmb，银行汇票',1509408000,28,1509431405),(30,3.00,'又来了3元。',1509408000,27,1509433924),(31,28.00,'ok~~~',1512000000,31,1509434205),(32,2.00,'ok!',1512000000,27,1509434237),(33,2.00,'wow~',1514592000,30,1509434273),(34,10000.00,'诚意金',1509408000,5,1509435041);

/*Table structure for table `s_recycled` */

DROP TABLE IF EXISTS `s_recycled`;

CREATE TABLE `s_recycled` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pid` int(10) unsigned NOT NULL COMMENT '对应相应的id',
  `kind` tinyint(1) NOT NULL COMMENT '1/任务管理 2/任务 3/通知',
  `type` tinyint(1) NOT NULL COMMENT '1/过程纪要,新任务,新通知 2/出图出差,已读通知,进行中任务 3/发函管理,历史任务,已回复通知 4/图纸归档,已发通知,已发任务',
  `del_time` int(10) DEFAULT '0' COMMENT '删除时间',
  `user_id` int(10) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=41 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `s_recycled` */

insert  into `s_recycled`(`id`,`pid`,`kind`,`type`,`del_time`,`user_id`) values (1,1,2,4,1508226943,1),(2,12,2,4,1508227000,1),(3,10,2,4,1508227175,1),(4,2,2,3,1508235768,1),(5,3,2,3,1508235927,1),(7,1,1,1,1508241279,1),(8,4,2,1,1508289233,1),(9,1,2,4,1508290026,1),(10,14,2,4,1508290032,1),(11,4,3,4,1508308624,1),(12,5,3,4,1508309708,1),(13,6,3,4,1508309963,1),(16,3,2,4,1508831134,1),(17,2,2,4,1508831145,1),(18,5,1,5,1508840522,2),(19,6,1,5,1508840603,2),(20,8,1,5,1508842501,2),(21,5,2,3,1509180999,1),(22,6,2,3,1509181001,1),(23,6,2,4,1509181007,1),(24,7,2,4,1509181009,1),(25,8,2,4,1509181010,1),(26,21,1,5,1509357951,2),(27,22,1,5,1509358331,6),(28,23,1,5,1509358417,1),(29,24,1,5,1509358969,2),(30,27,1,5,1509359634,6),(31,26,1,5,1509359636,1),(32,25,1,5,1509359637,6),(33,29,1,5,1509359747,1),(34,31,1,5,1509360532,1),(35,40,1,5,1509360668,1),(36,28,1,5,1509433771,16),(37,48,1,5,1509433774,6),(38,41,1,5,1509433852,7),(39,37,1,5,1509433857,1),(40,44,1,5,1509433946,1);

/*Table structure for table `s_role_type` */

DROP TABLE IF EXISTS `s_role_type`;

CREATE TABLE `s_role_type` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL COMMENT '类型名称',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='后台角色类型表';

/*Data for the table `s_role_type` */

insert  into `s_role_type`(`id`,`name`) values (1,'用户角色1'),(2,'用户角色2'),(3,'用户角色3'),(4,'用户角色4'),(5,'用户角色5'),(6,'角色X'),(7,'5:go away role!'),(8,'一个角色'),(9,'d');

/*Table structure for table `s_schedule` */

DROP TABLE IF EXISTS `s_schedule`;

CREATE TABLE `s_schedule` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 NOT NULL COMMENT '阶段名称',
  `content` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '' COMMENT '工作内容',
  `money` decimal(12,2) NOT NULL DEFAULT '0.00' COMMENT '阶段总金额',
  `receive` decimal(12,2) NOT NULL DEFAULT '0.00' COMMENT '已收款',
  `process` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '' COMMENT '过程记录',
  `project_id` int(10) unsigned NOT NULL COMMENT '项目ID',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '状态：0-进行中，1-已完成',
  `add_time` int(10) unsigned NOT NULL COMMENT '创建时间',
  `update_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `s_schedule` */

insert  into `s_schedule`(`id`,`name`,`content`,`money`,`receive`,`process`,`project_id`,`status`,`add_time`,`update_time`) values (1,'第一个阶段','sixsixsix',5500.00,120000.00,'',1,1,1507780399,1507780399),(2,'项目第二阶段','完成三分之一的搭建',200000.00,200000.00,'',1,1,1507780399,1507780399),(3,'项目第一阶段','搭好基础建设',120000.00,1000.00,'',2,0,1507865659,1507865659),(4,'项目第二阶段','完成三分之一的搭建',200000.00,0.00,'',2,0,1507865659,1507865659),(5,'项目第一阶段','搭好基础建设',120000.00,10000.00,'',3,0,1507865678,1507865678),(6,'项目第二阶段','完成三分之一的搭建',200000.00,0.00,'',3,0,1507865678,1507865678),(7,'项目第一阶段','搭好基础建设',120000.00,0.00,'',4,0,1507865736,1507865736),(8,'项目第二阶段','完成三分之一的搭建',200000.00,0.00,'',4,0,1507865736,1507865736),(9,'项目第一阶段','搭好基础建设',120000.00,0.00,'',5,0,1507865743,1507865743),(10,'项目第二阶段','完成三分之一的搭建',200000.00,0.00,'',5,0,1507865743,1507865743),(11,'这个是第三个阶段！！','这个是服务内容介绍。',1000011.00,0.00,'123dddlllllldfdsfasdf',1,0,1507883310,0),(12,'这个是最后一个阶段','2333333',50000.00,0.00,'123dddlllllldfdsfasdf',1,0,1507883385,1507883385),(13,'879','789879',7897.00,0.00,'',6,0,1508115019,1508115019),(14,'8797','789879',7897.00,0.00,'',6,0,1508115019,1508115019),(15,'879','789879',7897.00,0.00,'',7,0,1508115022,1508115022),(16,'8797','789879',7897.00,0.00,'',7,0,1508115022,1508115022),(17,'879','789879',7897.00,0.00,'',8,0,1508115028,1508115028),(18,'8797','789879',7897.00,0.00,'',8,0,1508115028,1508115028),(19,'879','789879',7897.00,0.00,'',9,0,1508115066,1508115066),(20,'8797','789879',7897.00,0.00,'',9,0,1508115066,1508115066),(21,'879','789879',7897.00,0.00,'',10,0,1508115072,1508115072),(22,'8797','789879',7897.00,0.00,'',10,0,1508115072,1508115072),(23,'第一阶段','很好',50.88,0.00,'',11,0,1508120138,1508120138),(24,'第二阶段','很好',50.88,0.00,'',11,0,1508120138,1508120138),(25,'第一阶段','哈哈哈',123.00,0.00,'',12,0,1508206763,1508206763),(26,'second','哈哈哈',123.00,0.00,'',12,0,1508206763,1508206763),(27,'年少出天门','武松打虎',10.00,10.00,'',13,1,1508219416,1508219416),(28,'214','武松打虎',10.00,10.00,'',13,1,1508219416,1508219416),(29,'第一阶段','werw',1212.00,0.00,'',17,0,1508221218,1508221218),(30,'部署阶段','部署-----------------',2.00,2.00,'最后部署',13,1,1509434082,1509434082),(31,'last','last service',28.00,28.00,'last service',13,1,1509434172,1509434172);

/*Table structure for table `s_staff` */

DROP TABLE IF EXISTS `s_staff`;

CREATE TABLE `s_staff` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `work_id` int(10) NOT NULL DEFAULT '0' COMMENT '工种ID',
  `user_id` int(10) unsigned NOT NULL COMMENT '用户ID',
  `labor` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '分工情况',
  `content` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '工作内容',
  `project_child_id` int(10) unsigned NOT NULL COMMENT '子项目ID',
  `add_time` int(10) unsigned NOT NULL COMMENT '创建时间',
  `update_time` int(10) unsigned NOT NULL COMMENT '更新时间',
  `status` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `s_staff` */

insert  into `s_staff`(`id`,`work_id`,`user_id`,`labor`,`content`,`project_child_id`,`add_time`,`update_time`,`status`) values (68,1,37,'1231231231','',36,1509437803,1509437803,0),(69,1,37,'撒旦','',32,1509437891,1509437891,0),(70,1,37,'啊','',33,1509438239,1509438239,0);

/*Table structure for table `s_stage_types` */

DROP TABLE IF EXISTS `s_stage_types`;

CREATE TABLE `s_stage_types` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL COMMENT '类型名称',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `s_stage_types` */

insert  into `s_stage_types`(`id`,`name`) values (1,'项目进行中'),(2,'项目第一阶段'),(3,'项目第二阶段'),(4,'项目完工');

/*Table structure for table `s_task` */

DROP TABLE IF EXISTS `s_task`;

CREATE TABLE `s_task` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(10) unsigned NOT NULL COMMENT '项目ID',
  `type` int(10) unsigned NOT NULL COMMENT '类型ID',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '任务标题',
  `file_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '附件原名称',
  `file` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '附件',
  `content` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '任务内容',
  `reply` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '回复内容',
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户ID',
  `start_time` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '任务开始时间',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态 (默认0 1是接受 2是拒绝 3是完成 4是删除)',
  `add_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `to_user` int(10) NOT NULL COMMENT '接收者',
  `update_at` int(10) DEFAULT '0' COMMENT '比如接收任务或者拒绝任务时的时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `s_task` */

insert  into `s_task`(`id`,`project_id`,`type`,`title`,`file_name`,`file`,`content`,`reply`,`user_id`,`start_time`,`status`,`add_time`,`to_user`,`update_at`) values (1,1,1,'test tile','default','/Uploads/task/2017-10-16/rp9qp57794n1n.png','test content','','1','2017-01-01',4,1508145868,1,0),(2,1,1,'test tile','default','/Uploads/task/2017-10-16/s4oo7rqp419s5.png','test content','','1','2017-01-01',4,1508146111,1,0),(3,1,1,'test tile','default','/Uploads/task/2017-10-16/p435qr69s728o.png','test content','奥术大师','1','2017-01-01',4,1508146172,1,1508233112),(4,1,1,'test tile','default','/Uploads/task/2017-10-17/64p5n9r477599.png','test content','啊啊啊','1','2017-01-01',4,1508210330,1,1508233664),(5,1,1,'test tile','default','/Uploads/task/2017-10-17/38r6n9or055q7.png','test content','啧啧啧','1','2017-01-01',4,1508210750,1,1508234997),(6,1,1,'测试标题','','undefined','内容测试测试','','1','2017-09-09',4,1508210827,1,0),(7,1,1,'测试标题','','undefined','内容测试测试','啊啊啊','1','2017-09-09',4,1508210827,1,1508233205),(8,1,1,'测试标题','','[附件]','内容测试测试','sad','1','2017-09-09',4,1508211022,1,1508233139),(9,1,1,'啊啊啊啊啊','','C:\\fakepath\\canvas.txt','啊啊啊啊啊啊啊啊啊啊','','1','2017-10-18',1,1508211085,7,0),(10,1,1,'AS啊','','','潇洒下大师傅','','1','2017-10-11',1,1508211258,10,0),(11,1,1,'阿三','','','A撒','','1','2017-10-17',1,1508212015,2,0),(12,1,1,'测试股','','','阿萨德','','1','2017-10-18',1,1508212063,10,0),(13,1,9,'zzz','','C:\\fakepath\\canvas.txt','重中之重','','1','2017-10-25',1,1508231641,12,0),(14,1,7,'种子','','','直接在就直接','','1','2017-10-19',4,1508231789,11,0),(15,25,1,'444',NULL,NULL,'测试','收到','32','2017-10-24',1,1508847229,33,1508847267),(16,25,1,'cs',NULL,NULL,'测试','丑拒','33','2017-10-24',1,1508847419,32,1508847457),(17,1,5,'54646','back_icon_38x38','/Uploads/task/2017-10-28/35qp4nqq69os4.png','546',NULL,'34','2017-10-02',1,1509176909,2,0);

/*Table structure for table `s_task_receive` */

DROP TABLE IF EXISTS `s_task_receive`;

CREATE TABLE `s_task_receive` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(10) NOT NULL COMMENT '任务接收者id',
  `pid` int(10) NOT NULL COMMENT '对应任务表id',
  `addtime` int(10) DEFAULT '0',
  `status` tinyint(1) DEFAULT '1' COMMENT '1/未接收 2/进行中 3/拒绝任务 4/软删除 5/已完成',
  `receive_time` int(10) DEFAULT '0' COMMENT '接受时间',
  `finish_time` int(10) DEFAULT '0' COMMENT '完成时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COMMENT='任务接收表';

/*Data for the table `s_task_receive` */

insert  into `s_task_receive`(`id`,`uid`,`pid`,`addtime`,`status`,`receive_time`,`finish_time`) values (1,1,1,1508145868,4,0,0),(2,1,2,1508146111,4,0,0),(3,1,3,1508146172,4,1508233112,0),(4,1,4,1508210330,4,1508233664,0),(5,1,5,1508210750,4,1508234997,0),(6,1,6,1508210827,4,1508235175,0),(7,1,7,1508210827,2,1508233205,0),(8,1,8,1508211022,2,1508233139,0),(9,7,9,1508211085,1,0,0),(10,10,10,1508211258,4,0,0),(11,2,11,1508212015,1,0,0),(12,10,12,1508212063,4,0,0),(13,12,13,1508231641,1,0,0),(14,11,14,1508231789,1,0,0),(15,33,15,1508847229,2,1508847267,0),(16,32,16,1508847419,3,1508847457,0),(17,2,17,1509176909,1,0,0);

/*Table structure for table `s_task_type` */

DROP TABLE IF EXISTS `s_task_type`;

CREATE TABLE `s_task_type` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL COMMENT '类型名称',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COMMENT='任务类型表';

/*Data for the table `s_task_type` */

insert  into `s_task_type`(`id`,`name`) values (1,'11111'),(2,'11111'),(3,'r'),(4,'wlyttttt'),(5,'支出-文具'),(6,'支出-文具'),(7,'df'),(8,'任务'),(9,'通知类型5'),(10,'通知类型5'),(11,'通知'),(12,'通知1'),(13,'财务月结'),(14,'d'),(15,'d'),(16,'赊账'),(17,'赊账'),(18,'99'),(19,'88');

/*Table structure for table `s_user` */

DROP TABLE IF EXISTS `s_user`;

CREATE TABLE `s_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户名',
  `password` char(32) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '密码',
  `nickname` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '姓名',
  `pic` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '/Uploads/default.png' COMMENT '用户头像',
  `sex` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '性别（默认0，0：保密，1：男，2女）',
  `birthday` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '出生年月',
  `worktime` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '参加工作时间',
  `school` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '毕业院校',
  `edu` tinyint(4) NOT NULL DEFAULT '0' COMMENT '学历默认0，0：小学，1：初中，2：中专，3：高中，4：大专，5：本科，6：研究生7：硕士8：博士：9其他',
  `position` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '职称',
  `mobile` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '手机号',
  `qq` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'QQ号码',
  `is_del` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否删除（默认0，1表示删除）',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注信息',
  `work_type` int(10) unsigned NOT NULL COMMENT '工种ID',
  `authority` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '权限ID',
  `role` int(10) unsigned NOT NULL DEFAULT '1' COMMENT '角色ID',
  `administer` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否管理层（默认0,1表示是）',
  `add_time` int(10) unsigned NOT NULL COMMENT '创建时间',
  `update_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  `is_super` tinyint(1) DEFAULT '0' COMMENT '0/非超级管理员 1/超级管理员',
  `del_time` int(10) DEFAULT '0' COMMENT '删除时间',
  `last_login_ip` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '上一次登录IP',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `s_user` */

insert  into `s_user`(`id`,`username`,`password`,`nickname`,`pic`,`sex`,`birthday`,`worktime`,`school`,`edu`,`position`,`mobile`,`qq`,`is_del`,`remark`,`work_type`,`authority`,`role`,`administer`,`add_time`,`update_time`,`is_super`,`del_time`,`last_login_ip`) values (1,'admin','21232f297a57a5a743894a0e4a801fc3','谢小明','/Uploads/user/head/2017-10-31/s7n5q57p59500.jpg',1,'1990-03-04','2014-07-01','清华大学',-1,'工程师','123123111','88888',0,NULL,14,'1,2,3',1,0,1507790295,1509434509,1,0,'119.130.19.188'),(2,'JayChou','21232f297a57a5a743894a0e4a801fc3','周杰伦','/Uploads/user/head/2017-10-20/9rqro219895r3.gif',2,'2000-01-01','2017-01-27','中山大学',7,'yiu','13744465756','654654658',0,NULL,18,'2,4,6',2,1,1507790505,1508892192,0,0,'119.130.105.200'),(3,'admins','21232f297a57a5a743894a0e4a801fc3','CEO','/Uploads/user/head/2017-10-31/o59sp1s79s7qp.jpg',1,'1991-09-14','2011-11-16','广州理工',7,'开管理','13330114238','5694123',0,NULL,1,'1,2,3',1,0,1507791079,1509412778,0,0,'119.130.19.188'),(4,'wangluyao','46f94c8de14fb36680850768ff1b7f2a','wly555','/Uploads/default.png',1,'2017-10-08','2017-10-10','university',6,'高中','13725309730','1487238516',0,NULL,7,'2,4,6',1,1,1507874072,0,0,0,NULL),(5,'solo','d99d52d4f73e3a88496534bab1ba8a44','孙大发','/Uploads/default.png',0,'2017-09-01','2017-09-01','当事方',6,'零售','134636324','346634',0,NULL,7,'1,2,3',1,0,1508070926,0,0,0,NULL),(6,'wanke','07514cdc2d802f0f99b922cdad6c24e7','万科','/Uploads/default.png',1,'2017-09-01','2017-09-01','浙江农林大学',0,'10','13744465756','56425645',0,NULL,3,'1,2,3',1,0,1508071399,0,0,0,NULL),(7,'5','e35cf7b66449df565f93c607d5a81d09','王璐瑶哈哈哈','/Uploads/default.png',1,'2017-09-01','2017-09-01','铁一中',6,'5','18537465364','6345346',1,NULL,2,'1,2,3',1,0,1508072116,0,0,1509432993,NULL),(8,'wly2','e35cf7b66449df565f93c607d5a81d09','王璐瑶','/Uploads/default.png',1,'2017-09-01','2017-09-01','铁一中',6,'4','18537465364','6345346',0,NULL,5,'1,2,3',1,0,1508072152,0,0,0,NULL),(9,'wly3','e35cf7b66449df565f93c607d5a81d09','王璐瑶','/Uploads/default.png',1,'2017-09-01','2017-09-01','铁一中',6,'4','18537465364','6345346',0,NULL,5,'1,2,3',1,0,1508072191,0,0,0,NULL),(10,'1','e35cf7b66449df565f93c607d5a81d09','王璐瑶5','/Uploads/default.png',1,'2017-09-01','2017-09-01','铁一中',0,'1','18537465364','6345346',0,NULL,1,'1,2,3',1,0,1508072335,0,0,0,NULL),(11,'10','9c4cdebf4401eacfa1a4177de47ef700','王璐遥','/Uploads/default.png',0,'2017-09-01','2017-09-01','浙江大学',7,'1','13723453324','345678906',0,NULL,1,'1,2,3',1,0,1508072484,0,0,0,NULL),(12,'输入职称','4e6d1a51f32c78595e4ca509bf711663','王璐遥','/Uploads/default.png',1,'2017-09-01','2017-09-01','浙江理工大学',0,'1','13574865468','46363643',0,NULL,1,'1,2,3',1,0,1508072644,0,0,0,NULL),(13,'test','674f3c2c1a8a6f90461e8a66fb5550ba','斯蒂芬','/Uploads/default.png',0,'2017-09-01','2017-09-01','大学',7,'2','18524363464','546456234',0,NULL,3,'1,2,3',8,0,1508145913,0,0,0,NULL),(14,'213312','5a228c96a65ba383632c1ee156ef4dd3','张三','/Uploads/default.png',1,'1994-06-12','2001-01-01','中山大学',0,'1','13168941033','89641534',0,NULL,1,'1,3',1,0,1508298067,0,0,0,NULL),(15,'account','5a228c96a65ba383632c1ee156ef4dd3','张三','/Uploads/default.png',1,'1994-06-12','2001-01-01','中山大学',4,'开发人员','13168941033','89641534',0,NULL,1,'1,2',5,0,1508318179,0,0,0,NULL),(16,'qweqwe','96e79218965eb72c92a549dd5a330112','sadasd','/Uploads/default.png',1,'2017-10-10','2017-10-09','hafo',3,'sadasd','13330114238','577815886',0,NULL,4,'1,3',1,0,1508318315,0,0,0,NULL),(17,'libai','49299ca918b02a430d8e677cbaea192d','李白','/Uploads/default.png',0,'2017-10-03','2017-10-02','asdasd',0,'asdad','13330114235','57841166',0,NULL,1,'1,2,3',1,0,1508318390,0,0,0,NULL),(18,'ertsdf','ebcbf63bb8fb6ba7654fc3e086990cbe','达达','/Uploads/default.png',0,'2017-09-01','2017-09-01','univer',2,'2','13746544324','536345',0,NULL,3,'1,2',1,0,1508376262,0,0,0,NULL),(19,'dddddddd','37e0c86903875b5673b5cd4b03fe8082','滴滴答答点点滴滴','/Uploads/default.png',0,'2017-09-01','2017-09-01','gf',2,'4','18528674553','436352345',0,NULL,5,'1,2,3',1,0,1508376530,0,0,0,NULL),(20,'ttttt','df3d29b9a3399ce211c68c7405fa599d','哦哦','/Uploads/default.png',0,'2017-09-01','2017-09-01','xx大学',3,'4','13567564555','4444444444',0,NULL,3,'1,2,3',1,0,1508376628,0,0,0,NULL),(21,'dog','e6b9912d00fe4af9fa776d54211bb609','而是','/Uploads/default.png',0,'2017-09-01','2017-09-01','月亮学院',4,'7','13789645686','4675646344',0,NULL,3,'1,3',1,0,1508376690,0,0,0,NULL),(22,'ttqer','f31a81e91afdcf0b84dfee82ec2fb196','杰里科','/Uploads/default.png',0,'2017-09-01','2017-09-01','东大学',2,'2','13725434567','5474574',0,NULL,3,'1,2,3',1,0,1508377679,0,0,0,NULL),(23,'dddddddddd','2d34b7fe471af00ad9c41d291dbcb81b','高德萨','/Uploads/default.png',0,'2017-09-01','2017-09-01','东东大学',5,'6','18888976543','456457457',0,NULL,14,'1,2,3',1,0,1508377737,0,0,0,NULL),(24,'forange','2d34b7fe471af00ad9c41d291dbcb81b','蓝精灵','/Uploads/default.png',0,'2017-09-01','2017-09-01','深圳大学',4,'6','18858976543','456457457',0,NULL,1,'1,2,3',1,0,1508377785,0,0,0,NULL),(25,'hundre','562ecaf61bec0bb85f71b2c0da8ae4d0','百可见','/Uploads/default.png',0,'2017-09-01','2017-09-01','深圳大学',4,'6','15858976543','765457453',0,NULL,7,'1,2,3',1,0,1508377831,0,0,0,NULL),(26,'jack','61b01e4d5c35bea9a3d1a5537a92e075','陈松伶','/Uploads/default.png',1,'2007-09-10','2017-09-01','深圳大学',4,'6','13358976543','765457453',0,NULL,1,'2,3',1,0,1508377884,0,0,0,NULL),(27,'stone','cd7d1f43d6f0071aab79b1b42c1702fb','石康军','/Uploads/default.png',0,'2005-09-05','2017-09-01','深圳大学',4,'6','13358564534','765457453',0,NULL,1,'2,3',1,0,1508377922,0,0,0,NULL),(28,'ytres','dc70967555632cf5f3e51803a18d3c1f','dfgf','/Uploads/default.png',0,'2017-09-01','2017-09-01','fgdhg',2,'gfdfdfg','15813343323','657545',0,NULL,4,'1,2,3',1,0,1508464957,0,0,0,NULL),(29,'津津','8d2d17ee615803c923cea35234c5ac94','45646','/Uploads/default.png',0,'2017-10-10','2017-10-09','舒泊客',6,'溜溜','18819400123','54646',1,NULL,4,'1,2,3',1,0,1508830894,0,0,1509290775,NULL),(30,'www','e10adc3949ba59abbe56e057f20f883e','test','/Uploads/user/head/2017-10-24/92o7r936ps625.jpg',0,'2017-09-01','2017-09-01','中山大学',2,'11','13800138000','11112222',0,NULL,2,'1,2,3',1,0,1508837063,1508845718,0,0,'119.130.105.200'),(31,'test1','e10adc3949ba59abbe56e057f20f883e','233','/Uploads/default.png',1,'2014-10-24','2017-10-24','北京大学',7,'aa','13111111111','708888888',0,NULL,1,'1,2,3',1,0,1508837322,1508837381,0,0,'58.62.204.245'),(32,'hhh','e10adc3949ba59abbe56e057f20f883e','啊啊','/Uploads/default.png',1,'2010-10-17','2017-10-24','清华大学',7,'11','13333333333','78888888',0,NULL,2,'1,2,3',1,0,1508846140,1508847425,0,0,'119.130.105.200'),(33,'test2','e10adc3949ba59abbe56e057f20f883e','test2','/Uploads/default.png',1,'2017-10-02','2017-10-26','恩恩',7,'嗷嗷','13777777777','78888888',0,NULL,3,'1,2,3',1,0,1508846326,1508847251,0,0,'119.130.18.252'),(34,'lisir','96e79218965eb72c92a549dd5a330112','一剑乘风去','/Uploads/user/head/2017-10-28/4p5624srp5r92.png',1,'2017-08-28','2017-10-28','驱蚊器',6,'撒的气温','13330114238','5774156465',0,NULL,12,'1,2,3',1,0,1509174085,1509434473,0,0,'119.130.105.179'),(35,'vip','2a38a4a9316c49e5a833517c45d31070','德芙','/Uploads/default.png',2,'2017-09-01','2017-09-04','广东大学',4,'地方','18537857356','547457457',0,NULL,18,'3',1,0,1509178537,0,0,0,NULL),(36,'666','7fa8282ad93047a4d6fe6111c93b308a','lk','/Uploads/default.png',0,'2017-10-04','2017-10-10','sad',3,'sad','13330114238','57786',0,NULL,3,'1,2,3',1,0,1509342784,0,0,0,NULL),(37,'mmmmmJay','e10adc3949ba59abbe56e057f20f883e','JayChou','/Uploads/user/head/2017-10-31/p0438151sp594.jpg',1,'1995-08-31','2017-09-30','中山大学',5,'基层员工','13156947133','79851657',0,NULL,14,'1,2,3',1,0,1509429528,1509437952,0,0,'119.130.18.73'),(38,'asdasdasd123','e10adc3949ba59abbe56e057f20f883e','asdasd1q2312','/Uploads/default.png',2,'2017-09-12','2017-09-19','asdasdasdasd',3,'sdasdasd','13652145611','123123123',0,NULL,6,'1,2,3',1,0,1509432954,0,0,0,NULL),(39,'wly','96e79218965eb72c92a549dd5a330112','wlyhhhh','/Uploads/default.png',2,'2017-09-05','2017-08-30','sda',4,'sada','13330114238','5778158836',0,NULL,4,'1,2,3',1,0,1509433035,1509433825,0,0,'119.130.19.188'),(40,'jene','e10adc3949ba59abbe56e057f20f883e','傻大个','/Uploads/default.png',1,'2017-09-01','2017-09-01','帝国大厦大学',7,'豆腐干','13725309740','346346534',0,NULL,6,'1,2,3',1,0,1509433387,0,0,0,NULL);

/*Table structure for table `s_user_token` */

DROP TABLE IF EXISTS `s_user_token`;

CREATE TABLE `s_user_token` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL COMMENT '用户ID',
  `token` varchar(50) DEFAULT NULL COMMENT 'token值',
  `add_time` int(10) DEFAULT '0' COMMENT '生成时间',
  `expire_time` int(10) DEFAULT '0' COMMENT '过期时间',
  PRIMARY KEY (`id`),
  KEY `indexs` (`user_id`,`token`,`expire_time`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='用户token表';

/*Data for the table `s_user_token` */

insert  into `s_user_token`(`id`,`user_id`,`token`,`add_time`,`expire_time`) values (1,1,'062ce6ed3de23c8b572c943ade2901b5',1507792080,1510039309),(2,2,'b8bbed74cb55cd02d2e7687848061d7e',1508375691,1509496992),(3,3,'01ffe812ac348388d36550a4b811c6d1',1508385464,1510019835),(4,30,'8941ff00b3727c7bb7ec2b30f8253610',1508837123,1510019835),(5,31,'a8148c344b2776d53cdcdb19bc21e10c',1508837333,1509442181),(6,32,'8e1c012b280534f9d47215bc794854ef',1508846369,1509452225),(7,33,'ef64e0b612cd26b85f771f3bfbfa12df',1508847251,1510019835),(8,34,'ffba36d00bfa6e9f4e86ed5c21def132',1509174142,0),(9,37,'9440b20e9d23be25dc4dc9ba5be6fcb0',1509429543,1510042752),(10,39,'197ac6b3741b7221e7a6f5bbab2c18eb',1509433125,1510038625);

/*Table structure for table `s_work` */

DROP TABLE IF EXISTS `s_work`;

CREATE TABLE `s_work` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '名称',
  `type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '类型（默认0 1是自定义工种）',
  `add_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `index` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `s_work` */

insert  into `s_work`(`id`,`name`,`type`,`add_time`) values (1,'规格负责',0,1507780399),(2,'方案负责',0,1507780399),(3,'建筑负责 ',0,1507780399),(4,'结构负责',0,1507780399),(5,'电气负责',0,1507780399),(6,'排水负责',0,1507780399),(7,'暖通负责',0,1507780399),(8,'9990',1,1507780399),(9,'景观设计',1,1507780399),(10,'5555',1,1507963230),(11,'9990',1,1507965441),(12,'wly',1,1507965631),(13,'vip',1,1507965642),(14,'客服',1,1508208775),(15,'客服8',1,1508208798),(16,'vip',1,1509174885),(17,'-',1,1509174930),(18,'司机',1,1509176522),(19,'',1,1509177397),(20,'7',1,1509177401);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
