<?php
/**
 * Created by PhpStorm.
 * User: User
 * Date: 13.07.2018
 * Time: 23:48
 */
include 'kint.php';

$data = [
    'news' => [
        ['Новость 1', 'Сегодня ночью'],
        ['Новость 2', 'Сегодня после полуночи']
    ],
    'article' => [
        ['Статья 1', 'Очень интересно'],
        ['Статья 2', 'Не очень интересно вдвойне']
    ]
];

$category = $_GET['category'];
$num = $_GET['number'];
$title = $data[$category][$num][0];
$content = $data[$category][$num][1];
?>
<ul>
    <?php foreach ($data as $groupName => $group): ?>
        <?php foreach ($group as $index => $item): ?>
            <li>
                <a href="?category=<?=$groupName?>&number=<?=$index?>">
                    <?=$item[0]?>
                </a>
            </li>
        <? endforeach; ?>
    <? endforeach; ?>
</ul>

<form action="">
    <label for="name">Имя: </label><input type="text" name="name" id="name"/><br>
    <label for="content">Комментарий: </label>
    <textarea name="content" id="content" cols="30" rows="10"></textarea>
    <input type="submit" value="Отправить">
</form>


<h1><?=$title?></h1>
<p><?=$content?></p>
