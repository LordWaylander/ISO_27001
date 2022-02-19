-- phpMyAdmin SQL Dump
-- version 5.0.4deb2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : sam. 19 fév. 2022 à 12:15
-- Version du serveur :  10.5.12-MariaDB-0+deb11u1
-- Version de PHP : 7.4.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `iso`
--

-- --------------------------------------------------------

--
-- Structure de la table `entreprises`
--

CREATE TABLE `entreprises` (
  `id_entreprise` int(3) NOT NULL,
  `nom_entreprise` varchar(255) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `code_postal` int(3) NOT NULL,
  `ville` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `entreprises`
--

INSERT INTO `entreprises` (`id_entreprise`, `nom_entreprise`, `adresse`, `code_postal`, `ville`) VALUES
(1, 'entreprise imaginaire', '20 rue de l’imagination', 69000, 'ImaginLand'),
(2, 'entre create', 'rue de la creation', 85200, 'lol');

-- --------------------------------------------------------

--
-- Structure de la table `frequence_collectes`
--

CREATE TABLE `frequence_collectes` (
  `id_frequence` int(3) NOT NULL,
  `frequence` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `frequence_collectes`
--

INSERT INTO `frequence_collectes` (`id_frequence`, `frequence`) VALUES
(1, 'mensuelle'),
(2, 'trimestrielle'),
(3, 'anuelle');

-- --------------------------------------------------------

--
-- Structure de la table `indicateurs`
--

CREATE TABLE `indicateurs` (
  `id_indicateur` int(3) NOT NULL,
  `indicateur` varchar(255) NOT NULL,
  `processus_id` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `indicateurs`
--

INSERT INTO `indicateurs` (`id_indicateur`, `indicateur`, `processus_id`) VALUES
(32, 'I5', 38),
(48, 'Certification ISO 27001', 1),
(49, 'lol', 1),
(71, 'i3', 36),
(73, 'i7', 38);

-- --------------------------------------------------------

--
-- Structure de la table `objectifs`
--

CREATE TABLE `objectifs` (
  `id_objectif` int(3) NOT NULL,
  `objectif` varchar(255) NOT NULL,
  `risque_id` int(3) NOT NULL,
  `processus_id` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `objectifs`
--

INSERT INTO `objectifs` (`id_objectif`, `objectif`, `risque_id`, `processus_id`) VALUES
(27, 'o2', 1, 36),
(36, 'objectif', 1, 1),
(37, 'azeob', 3, 1),
(42, 'O5', 2, 38);

-- --------------------------------------------------------

--
-- Structure de la table `opportunites`
--

CREATE TABLE `opportunites` (
  `id_opportunite` int(3) NOT NULL,
  `opportunite` varchar(255) NOT NULL,
  `risque_id` int(3) NOT NULL,
  `processus_id` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `opportunites`
--

INSERT INTO `opportunites` (`id_opportunite`, `opportunite`, `risque_id`, `processus_id`) VALUES
(26, 'op2', 2, 36),
(36, 'op7', 2, 1),
(37, 'zsxop', 1, 1),
(42, 'OP5', 2, 38);

-- --------------------------------------------------------

--
-- Structure de la table `plans_actions`
--

CREATE TABLE `plans_actions` (
  `id_planAction` int(3) NOT NULL,
  `date_creation` date DEFAULT NULL,
  `etat` int(1) NOT NULL,
  `description` varchar(255) NOT NULL,
  `analyse_cause` varchar(255) NOT NULL,
  `traitement_curatif` varchar(255) DEFAULT NULL,
  `action` varchar(255) NOT NULL,
  `commentaire` varchar(255) DEFAULT NULL,
  `date_debut` date DEFAULT NULL,
  `date_fin` date DEFAULT NULL,
  `processus_id` int(3) DEFAULT NULL,
  `assignation_user_id` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `plans_actions`
--

INSERT INTO `plans_actions` (`id_planAction`, `date_creation`, `etat`, `description`, `analyse_cause`, `traitement_curatif`, `action`, `commentaire`, `date_debut`, `date_fin`, `processus_id`, `assignation_user_id`) VALUES
(17, '2022-01-27', 0, 'fdsfdsf', 'fdsfdsf', 'fsdfdsf', 'fsdfdsf', 'fsdfsdf', '2022-01-21', '2022-01-22', 1, 1),
(19, '2022-01-27', 50, 'dhfnsgdd', 'analyse', 'traitement', 'automatisation SLA par tickets', 'dsddgfsd', '2022-02-01', '2022-02-03', 38, 4),
(20, '2022-01-27', 0, 'cdcdsc', 'cdsdcds', 'dscdsc', 'cdscds', 'cdscsd', '2022-02-04', '2022-02-05', 38, 2),
(22, '2022-02-02', 50, 'fdsfdsf', 'dsfdsqfdsf', 'dfdsqfdsfds', 'dqfdsfdsqqf', 'fdsfdsqfdsf', '2022-01-20', '2022-01-22', 1, 4);

-- --------------------------------------------------------

--
-- Structure de la table `processus`
--

CREATE TABLE `processus` (
  `id_processus` int(3) NOT NULL,
  `nom_processus` varchar(255) NOT NULL,
  `finalite` varchar(255) DEFAULT NULL,
  `frequence_id` int(3) DEFAULT NULL,
  `relais_user_id` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `processus`
--

INSERT INTO `processus` (`id_processus`, `nom_processus`, `finalite`, `frequence_id`, `relais_user_id`) VALUES
(1, 'Direction', 'finalité processus', 3, 1),
(36, 'P2', NULL, 1, 3),
(38, 'R5', 'finalité', 2, 1);

-- --------------------------------------------------------

--
-- Structure de la table `relation_ressourceUser_processus`
--

CREATE TABLE `relation_ressourceUser_processus` (
  `id` int(3) NOT NULL,
  `ressource_user_id` int(3) NOT NULL,
  `processus_id` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `relation_ressourceUser_processus`
--

INSERT INTO `relation_ressourceUser_processus` (`id`, `ressource_user_id`, `processus_id`) VALUES
(54, 1, 36),
(85, 2, 1),
(90, 2, 38),
(91, 3, 38);

-- --------------------------------------------------------

--
-- Structure de la table `risques`
--

CREATE TABLE `risques` (
  `id_risque` int(3) NOT NULL,
  `risque` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `risques`
--

INSERT INTO `risques` (`id_risque`, `risque`) VALUES
(1, 'faible'),
(2, 'moyen'),
(3, 'fort');

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

CREATE TABLE `roles` (
  `id_role` int(3) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id_role`, `role`) VALUES
(1, 'admin'),
(2, 'relais'),
(3, 'classique');

-- --------------------------------------------------------

--
-- Structure de la table `suivis`
--

CREATE TABLE `suivis` (
  `id_suivi` int(3) NOT NULL,
  `janvier` varchar(255) DEFAULT NULL,
  `fevrier` varchar(255) DEFAULT NULL,
  `mars` varchar(255) DEFAULT NULL,
  `avril` varchar(255) DEFAULT NULL,
  `mai` varchar(255) DEFAULT NULL,
  `juin` varchar(255) DEFAULT NULL,
  `juillet` varchar(255) DEFAULT NULL,
  `aout` varchar(255) DEFAULT NULL,
  `septembre` varchar(255) DEFAULT NULL,
  `octobre` varchar(255) DEFAULT NULL,
  `novembre` varchar(255) DEFAULT NULL,
  `decembre` varchar(255) DEFAULT NULL,
  `processus_id` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `suivis`
--

INSERT INTO `suivis` (`id_suivi`, `janvier`, `fevrier`, `mars`, `avril`, `mai`, `juin`, `juillet`, `aout`, `septembre`, `octobre`, `novembre`, `decembre`, `processus_id`) VALUES
(1, '0', 'sdsqdsqd', 'dsqdsqdqsd', '', '', '', '', '', '', '', '', '', 1),
(21, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 36),
(23, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 38);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id_user` int(3) NOT NULL,
  `nom_user` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int(3) NOT NULL,
  `entreprise_id` int(3) DEFAULT NULL,
  `resetPasswordToken` varchar(255) DEFAULT NULL,
  `resetPasswordExpires` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id_user`, `nom_user`, `email`, `password`, `role_id`, `entreprise_id`, `resetPasswordToken`, `resetPasswordExpires`) VALUES
(1, 'admin', 'admin@admin.fr', '$2b$10$563Ut9OoO6SYkHJRWixVbebuuXnRL2TlQIZstghJXy5MsHF.XvCVq', 1, 1, NULL, NULL),
(2, 'test moduf', 'test@test.fr', '$2b$10$KukqM7do1JMsESYYmGu4zuGiW1UneJdg6dnDFxWiUg3oOxit2hhSq', 2, 1, NULL, NULL),
(3, 'classique', 'classique@classique.fr', '$2b$10$KukqM7do1JMsESYYmGu4zuGiW1UneJdg6dnDFxWiUg3oOxit2hhSq', 3, 1, NULL, NULL),
(4, 'test create', 'create@create.fr', '$2b$10$BFcADS4BGD5hN4yKjHjrH.X32woFMkCuiJLUhCqXxlVmn5BRILO32', 3, NULL, NULL, NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `entreprises`
--
ALTER TABLE `entreprises`
  ADD PRIMARY KEY (`id_entreprise`);

--
-- Index pour la table `frequence_collectes`
--
ALTER TABLE `frequence_collectes`
  ADD PRIMARY KEY (`id_frequence`);

--
-- Index pour la table `indicateurs`
--
ALTER TABLE `indicateurs`
  ADD PRIMARY KEY (`id_indicateur`),
  ADD KEY `fk_indicateurs_processus` (`processus_id`);

--
-- Index pour la table `objectifs`
--
ALTER TABLE `objectifs`
  ADD PRIMARY KEY (`id_objectif`),
  ADD KEY `fk_objectifs_risque` (`risque_id`),
  ADD KEY `fk_objectifs_processus` (`processus_id`);

--
-- Index pour la table `opportunites`
--
ALTER TABLE `opportunites`
  ADD PRIMARY KEY (`id_opportunite`),
  ADD KEY `fk_opportunites_risque` (`risque_id`),
  ADD KEY `fk_opportunites_processus` (`processus_id`);

--
-- Index pour la table `plans_actions`
--
ALTER TABLE `plans_actions`
  ADD PRIMARY KEY (`id_planAction`),
  ADD KEY `fk_planAction_processus` (`processus_id`),
  ADD KEY `fk_planAction_assignation_user` (`assignation_user_id`);

--
-- Index pour la table `processus`
--
ALTER TABLE `processus`
  ADD PRIMARY KEY (`id_processus`),
  ADD KEY `fk_processus_frequence` (`frequence_id`),
  ADD KEY `fk_processus_relais_user` (`relais_user_id`);

--
-- Index pour la table `relation_ressourceUser_processus`
--
ALTER TABLE `relation_ressourceUser_processus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ressource_users` (`ressource_user_id`),
  ADD KEY `fk_ressource_processus` (`processus_id`);

--
-- Index pour la table `risques`
--
ALTER TABLE `risques`
  ADD PRIMARY KEY (`id_risque`);

--
-- Index pour la table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_role`);

--
-- Index pour la table `suivis`
--
ALTER TABLE `suivis`
  ADD PRIMARY KEY (`id_suivi`),
  ADD KEY `fk_suivis_processus` (`processus_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `fk_entreprise_users` (`entreprise_id`),
  ADD KEY `fk_role_users` (`role_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `entreprises`
--
ALTER TABLE `entreprises`
  MODIFY `id_entreprise` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `frequence_collectes`
--
ALTER TABLE `frequence_collectes`
  MODIFY `id_frequence` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `indicateurs`
--
ALTER TABLE `indicateurs`
  MODIFY `id_indicateur` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT pour la table `objectifs`
--
ALTER TABLE `objectifs`
  MODIFY `id_objectif` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT pour la table `opportunites`
--
ALTER TABLE `opportunites`
  MODIFY `id_opportunite` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT pour la table `plans_actions`
--
ALTER TABLE `plans_actions`
  MODIFY `id_planAction` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT pour la table `processus`
--
ALTER TABLE `processus`
  MODIFY `id_processus` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT pour la table `relation_ressourceUser_processus`
--
ALTER TABLE `relation_ressourceUser_processus`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT pour la table `risques`
--
ALTER TABLE `risques`
  MODIFY `id_risque` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `roles`
--
ALTER TABLE `roles`
  MODIFY `id_role` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `suivis`
--
ALTER TABLE `suivis`
  MODIFY `id_suivi` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `indicateurs`
--
ALTER TABLE `indicateurs`
  ADD CONSTRAINT `fk_indicateurs_processus` FOREIGN KEY (`processus_id`) REFERENCES `processus` (`id_processus`);

--
-- Contraintes pour la table `objectifs`
--
ALTER TABLE `objectifs`
  ADD CONSTRAINT `fk_objectifs_processus` FOREIGN KEY (`processus_id`) REFERENCES `processus` (`id_processus`),
  ADD CONSTRAINT `fk_objectifs_risque` FOREIGN KEY (`risque_id`) REFERENCES `risques` (`id_risque`);

--
-- Contraintes pour la table `opportunites`
--
ALTER TABLE `opportunites`
  ADD CONSTRAINT `fk_opportunites_processus` FOREIGN KEY (`processus_id`) REFERENCES `processus` (`id_processus`),
  ADD CONSTRAINT `fk_opportunites_risque` FOREIGN KEY (`risque_id`) REFERENCES `risques` (`id_risque`);

--
-- Contraintes pour la table `plans_actions`
--
ALTER TABLE `plans_actions`
  ADD CONSTRAINT `fk_planAction_assignation_user` FOREIGN KEY (`assignation_user_id`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `fk_planAction_processus` FOREIGN KEY (`processus_id`) REFERENCES `processus` (`id_processus`);

--
-- Contraintes pour la table `processus`
--
ALTER TABLE `processus`
  ADD CONSTRAINT `fk_processus_frequence` FOREIGN KEY (`frequence_id`) REFERENCES `frequence_collectes` (`id_frequence`),
  ADD CONSTRAINT `fk_processus_relais_user` FOREIGN KEY (`relais_user_id`) REFERENCES `users` (`id_user`);

--
-- Contraintes pour la table `relation_ressourceUser_processus`
--
ALTER TABLE `relation_ressourceUser_processus`
  ADD CONSTRAINT `fk_ressource_processus` FOREIGN KEY (`processus_id`) REFERENCES `processus` (`id_processus`),
  ADD CONSTRAINT `fk_ressource_users` FOREIGN KEY (`ressource_user_id`) REFERENCES `users` (`id_user`);

--
-- Contraintes pour la table `suivis`
--
ALTER TABLE `suivis`
  ADD CONSTRAINT `fk_suivis_processus` FOREIGN KEY (`processus_id`) REFERENCES `processus` (`id_processus`);

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_entreprise_users` FOREIGN KEY (`entreprise_id`) REFERENCES `entreprises` (`id_entreprise`),
  ADD CONSTRAINT `fk_role_users` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id_role`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
